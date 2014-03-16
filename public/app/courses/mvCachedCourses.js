angular.module('app').factory('mvCachedCourses', function(mvCourse){
  var courseList;
  return {
    query: function () {
      courseList = courseList || mvCourse.query();
      return courseList;
    }
  }
});