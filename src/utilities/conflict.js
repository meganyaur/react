const parseMeets = (meets) => {
    let [days, time] = meets.split(" ");
    let [start, end] = time.split("-");
    let [hourStart, minStart] = start.split(":");
    start = parseInt(hourStart) * 60 + parseInt(minStart);
    let [hourEnd, minEnd] = end.split(":");
    end = parseInt(hourEnd) * 60 + parseInt(minEnd);
    days = days.split(/(?=[A-Z])/);
    return [days, start, end];
  };
  
  const parseCourse = (course) => [course.term].concat(parseMeets(course.meets));
  
  const termsConflict = (term1, term2) => term1 === term2;
  
  const daysConflict = (day1, day2) => day1.some((d) => day2.includes(d));
  
  const hoursConflict = (startTerm1, endDay1, startTerm2, endDay2) =>
    (startTerm1 >= startTerm2 && startTerm1 <= endDay2) || (endDay1 >= startTerm2 && endDay1 <= endDay2) || (startTerm1 <= startTerm2 && endDay1 >= endDay2);
  

  const isCoursesConflict = (coursendDay1, coursendDay2) => {
    let [term, days, start, end] = parseCourse(coursendDay1);
    let [term2, daystartTerm2, startTerm2, endDay2] = parseCourse(coursendDay2);
    return (
      termsConflict(term, term2) &&
      daysConflict(days, daystartTerm2) &&
      hoursConflict(start, end, startTerm2, endDay2)
    );
  };
  
  export const addConflicts = (conflicts, newCourse, selected, courses) => {
    const currConflicts = [];
    for (const [id, course] of Object.entries(courses)) {
      if (isCoursesConflict(courses[newCourse], courses[id]) && !(conflicts.includes(id) || selected.includes(id) || id === newCourse)) {
        currConflicts.push(id);
      }
    }
    return conflicts.concat(currConflicts);
  };

  export const removeConflicts = (
    conflicts,
    newSelected,
    removedSelection,
    courses
  ) =>
    conflicts.filter(
      (conflict) =>
        !isCoursesConflict(courses[removedSelection], courses[conflict]) &&
        newSelected.some((selectedCourse) =>
          isCoursesConflict(courses[conflict], courses[selectedCourse])
        )
    );