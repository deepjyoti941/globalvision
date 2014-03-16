var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
  title: {type: String, required: '{PATH} is required!'},
  featured: {type: Boolean, required: '{PATH} is required!'},
  published: {type: Date, required: '{PATH} is required!'},
  tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses () {
  Course.find({}).remove(function () {
    Course.create({title: 'C# for Sociopaths',content:'aaa', featured: true, published: new Date('10/5/2013'), tags:['C#']});
    Course.create({title: 'C# for Non-Sociopaths',content:'aaa', featured: true, published: new Date('10/12/2013'), tags:['C#']});
    Course.create({title: 'Super Duper Expert C#',content:'aaa', featured: false, published: new Date('10/1/2013'), tags:['C#']});
    Course.create({title: 'Visual Basic for Visual Basic Developers',content:'aaa', featured: false, published: new Date('7/12/2013'), tags:['C++']});
    Course.create({title: 'Pedantic C++',content:'aaa', featured: true, published: new Date('1/1/2013'), tags:['C++']});
    Course.create({title: 'JavaScript for People over 20',content:'aaa', featured: true, published: new Date('10/13/2013'), tags:['JS']});
    Course.create({title: 'Maintainable Code for Cowards',content:'aaa', featured: true, published: new Date('3/1/2013'), tags:['Coding']});
    Course.create({title: 'A Survival Guide to Code Reviews',content:'aaa', featured: true, published: new Date('2/1/2013'),tags:['Coding']});
    Course.create({title: 'How to Job Hunt Without Alerting your Boss',content:'aaa', featured: true, published: new Date('10/7/2013'),tags:['Misc']});
    Course.create({title: 'How to Keep your Soul and go into Management',content:'aaa', featured: false, published: new Date('8/1/2013'),tags:['Coding']});
    Course.create({title: 'Telling Recruiters to Leave You Alone',content:'aaa', featured: false, published: new Date('11/1/2013'),tags:['Coding']});
    Course.create({title: "Writing Code that Doesn't Suck",content:'aaa', featured: true, published: new Date('10/13/2013'),tags:['Coding']});
    Course.create({title: 'Code Reviews for Jerks',content:'aaa', featured: false, published: new Date('10/1/2013'),tags:['Misc']});
    Course.create({title: 'How to Deal with Narcissistic Coworkers',content:'aaa', featured: true, published: new Date('2/15/2013'),tags:['Coding','Misc']});
    Course.create({title: 'Death March Coding for Fun and Profit',content:'aaa', featured: true, published: new Date('7/1/2013'),tags:['Coding','Misc']});
  });
}

exports.createDefaultCourses = createDefaultCourses;