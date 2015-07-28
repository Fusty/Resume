//Author:  Alex Sterling
//2015-07-28
//Recursive JSON based resume builder
//Inspired by jsonresume.org


$(document).ready(function(){
	//Load up JSON
	//getResumeJSON();
	localGetJSON();

});

function getResumeJSON(){
	$.getJSON("resume.json", function(data){
		//Go populate page
		fillResume("", data);
	});
}

function fillResume(index, data){
	//Recursive resume filling!
	if(typeof data == 'object'){
		console.log('Diving deeper into '+index);
		//TODO:  Make this portion work
		// //If it's an array we'll see if we need to iterate it's container
		// if(data instanceof Array){
		// 	$.each(data, function(i,v){
		// 		//If the final container exists, skip these steps, otherwise . . .
		// 		if(!$('#'+index+'-container-'+i)[0]){
		// 			//Clone template container into .holding-ground
		// 			$('#'+index+'-container').clone().appendTo('.holding-ground');

		// 			//Modify id before stringifying
		// 			var id = $('.holding-ground #'+index+'-container').attr('id');
		// 			$('.holding-ground #'+index+'-container').attr('id', id+"-"+i);

		// 			//Stringify this chunk of html
		// 			var html = $('.holding-ground').html();

		// 			//Increment index on cloned template
		// 			html = html.replace('0', i);


		// 			//Copy back into where it should be
		// 			$('#'+index+'-container-'+i).clone().appendTo($('#'+index+'-container').parent());

		// 			//Delete what we cloned
		// 			$('.holding-ground #'+index+'-container-'+i).remove();

		// 			//Hide the template container, just in case (also for reuse)
		// 			$('#'+index+'-container').hide();
		// 		}
		// 	});
		// }
		$.each(data, function(i, v){
			fillResume(index+"-"+i,v);
		});
	}else{
		console.log('Filling in '+index);
		fillSingleField(index, data);
	}
}

function fillSingleField(index, value){
	//Handle images, hrefs etc.
	if(index == 'basics-picture'){
		$('#'+index.substring(1)).attr('src',value);
	}else if(index.match(/-work-[0-9]*-website/)){
		$('#'+index.substring(1).replace('website', 'company')).attr('href', value);
	}else if(index.match(/-publications-[0-9]*-website/)){
		$('#'+index.substring(1).replace('website', 'name')).attr('href', value);
	}else{
		$('#'+index.substring(1)).text(value);
	}
}

function localGetJSON(){
	data = 
{
  "basics": {
    "name": "Alex Sterling",
    "label": "Developer",
    "picture": "",
    "email": "sterlingalex@gmail.com",
    "phone": "(330) 703 5397",
    "website": "",
    "summary": "Alex is from Wadsworth, Ohio.  ",
    "location": {
      "address": "153 Westgate Ave.",
      "postalCode": "44281",
      "city": "Wadsworth",
      "countryCode": "US",
      "region": ""
    },
    "profiles": [
      {
        "network": "Github",
        "username": "fusty",
        "url": "http://github.com/fusty"
      }
    ]
  },
  "work": [
    {
      "company": "University of Akron, Information and Technology Services",
      "position": "Senior Web Developer",
      "website": "http://www.uakron.edu",
      "startDate": "06-02-2013",
      "endDate": "08-14-2015",
      "summary": "As Senior Web Developer I was in charge of web application design and development.  All work was deployed on RedHat 6 servers running PHP 5.3 and developed on Ubuntu 12.04 systems.  Extensive experience with build tools allowed me to cover the entire stack (htaccess/folder permissions to front end design) excluding Apache server settings when building applications",
      "highlights": [
        "Mastery of debugging PHP, JavaScript, SQL queries, CSS, HTML, Apache Velocity and more",
        "Mastery of API interfacing (JavaScript, PHP, REST, SOAP etc.)",
        "",
        "Extensive use of VI/VIM, SublimeText and PHPStorm",
        "Experience on Linux servers (Ubuntu 12.04 and RedHat 6)",
        "Extensive use of, and preference for, command line tools",
        "Constant use of GIT version control (GitHub and BitBucket via CLI)",
        "Small-Team GIT repository management",
        "2 years of OOP PHP development",
        "Experience following PHP PSRs 0-2",
        "Extensive Laravel 4 development (From small utilities to scalable applications)",
        "2 years of REST server design/implementation experience",
        "Constant use of Composer PHP package manager",
        "Extensive use of build tools (Gulp, CSS/JS Minifcation, CSS Autoprefixing, Markdown parsing etc.)",
        "Constant use of AJAX in applications",
        "Comfort using front-end libraries such as Bootstrap, Foundation, jQuery and jQueryUI/Mobile",
        "IE8+ cross-browser compatibility familiarity",
        "E-Mail cross-client compatibility familiarity",
        "SASS/LESS experience"
      ]
    },
    {
      "company": "Parking and Transportation Services, The University of Akron",
      "position": "Office Assistant",
      "website": "http://www.uakron.edu/parking",
      "startDate": "6-31-2009",
      "endDate": "6-02-2013",
      "summary": "Parking and Transportation Services manages all parking on the University of Akron's main campus.  This includes maintenance and manning of lots during special events on campus.  An office assistant maintains computer based records and systems used to perform the daily operations of the Parking office.  ",
      "highlights": [
        "Daily use of *NIX environments",
        "Maintenance and Development of PHP, Javascript and SQL based web content",
        "Maintenance of server-side Perl scripts",
        "Daily use of SQL console and query syntax",
        "Developed an automated PDF parking permit generator",
        "Distribution of messaging over twitter, facebook, email, listserves and web pages",
        "Creation of internal and public maps, promotions, flyers and posters for electronic and print publications.",
        "Developed an application to reserve shuttle service, invoice said service and notify shuttle coordinators of the requested service"
      ]
    },
    {
      "company": "LMS Surveying LTD.",
      "position": "Office Support",
      "website": "http://www.lmssurveying.com/",
      "startDate": "2-1-2008",
      "endDate": "8-1-2008",
      "summary": "LMS Surveying LTD. is a land surveying company focusing on plotting improvements to property for tax and sales purposes.",
      "highlights": [
        "Build a Microsoft Access database to store job information and organize the field crew",
        "Redesign website (no longer their current website)",
        "Learn AutoCAD drafting process for surface surveys"
      ]
    },
    {
      "company": "Digital Media Center, Johns Hopkins University",
      "position": "Front Desk Worker",
      "website": "http://digitalmedia.jhu.edu/",
      "startDate": "7-1-2006",
      "endDate": "1-31-2008",
      "summary": "The Digital Media Center is an advanced and specialized computer lab and equipment rental/borrowing facility.  The software on the computers ranges from 3D modeling/animation to Photoshop to ProTools.  The equipment facilitated the capture of media to be processed in the Digital Media Center.  A front desk worker would coach the patrons requesting assistance to the best of their ability as well as loaning equipment to patrons and training patrons on their use.",
      "highlights": [
        "Trained and coached college students on a variety of digital media software and projects.  Software included Adobe Creative Suite, Adobe Final Cut, Avid Suite, Microsoft Office, 3DS Max, and Maya 3D",
        "Opened and closed a 20+ station computer lab also specializing in the loaning out of audio-visual caputre equipment and training on audio-visual equipment"
      ]
    }
  ],
  "volunteer": [],
  "education": [
    {
      "institution": "The University of Akron",
      "area": "Computer Science",
      "studyType": "Bachelors",
      "startDate": "2010-08",
      "endDate": "2016-08",
      "gpa": "",
      "courses": [
        "Introduction to C++",
        "Computer Science 2 (OOP C++)",
        "Discrete Mathematics",
        "Calculus III"
      ]
    },
    {
      "institution": "Johns Hopkins University",
      "area": "Mechanical Engineering",
      "studyType": "Bachelors",
      "startDate": "2006-08",
      "endDate": "2008-01",
      "gpa": "",
      "courses": [
        "Thermodynamics",
        "Calculus II",
        "Statics"
      ]
    }
  ],
  "awards": [],
  "publications": [
    {
      "name": "University of Akron Campus Map",
      "publisher": "University of Akron",
      "releaseDate": "September 2013",
      "website": "http://maps.uakron.edu",
      "summary": "Interactive campus map built on top of Google Maps API.  Includes driving/walking/biking directions, building information, deep-linking of building profiles all with a graphical backend for distributed management."
    },
    {
      "name": "University of Akron Email/Web Publication Tool",
      "publisher": "University of Akron",
      "releaseDate": "February 2015",
      "website": "http://share.uakron.edu/mailAll",
      "summary": "A universal publication and distribution CMS for campus use.  Allows the creation, moderation and distribution of publications organized by articles.  Allows reader submission of articles, custom front-end formatting, and fine-grained permissioning.  The application can scale to an arbitrary number of publications natively."
    },
    {
      "name": "University of Akron Google Search Appliance",
      "publisher": "University of Akron",
      "releaseDate": "2015-06",
      "website": "http://gsa.uakron.edu/",
      "summary": "Heavy XSLT modifications to the GSA so it looks like the rest of uakron.edu sites"
    }
  ],
  "skills": [
    {
      "name": "Web Development",
      "level": "Lead Developer",
      "keywords": [
        "HTML",
        "CSS",
        "Javascript",
        "SQL",
        "PHP",
        "GULP",
        "NPM",
        "dotCMS",
        "Apache Velocity"
      ]
    },
    {
      "name": "Graphic Design",
      "level": "Hobbyist",
      "keywords": [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "GIMP",
        "Python Animation",
        "Sketchup",
        "Blender",
        "Unity3D"
      ]
    }
  ],
  "languages": [
    {
      "language": "English",
      "fluency": "Native speaker"
    }
  ],
  "interests": [],
  "references": []
}
	fillResume("", data);
}
