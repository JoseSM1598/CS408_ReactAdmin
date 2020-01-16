
// datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
Date.dateDiff = function(datepart, fromdate, todate) {	
    datepart = datepart.toLowerCase();	
    var diff = todate.getTime() - fromdate.getTime();	
    var divideBy = { w:604800000, 
                     d:86400000, 
                     h:3600000, 
                     n:60000, 
                     s:1000 };	
    
    return Math.floor(diff/divideBy[datepart]);
  }


var today = new Date()  

export const transactions = [
    {
      inquirerName: "Michael",
      answerName: "Jose",
      timeAgo: Date.dateDiff('h', new Date(2019, 9, 11, 1, 33, 30), today).toString(),
      question: "eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada bibendum arcu vitae elementum",
      answer: "Non arcu risus quis varius quam. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim",
      thanked: ["David", "Louis", "Inchan"],
      viewed: ["Jose", "Eric", "Caleb"]
    },

    {
        inquirerName: "Michael",
        answerName: "Jose",
        timeAgo: Date.dateDiff('h', new Date(2019, 9, 11, 1, 33, 30), today).toString(),
        question: "eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada bibendum arcu vitae elementum",
        answer: "Non arcu risus quis varius quam. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim",
        thanked: ["David", "Louis", "Inchan"],
        viewed: ["Jose", "Eric", "Caleb"]
      },

      {
        inquirerName: "Michael",
        answerName: "Jose",
        timeAgo: Date.dateDiff('h', new Date(2019, 9, 11, 1, 33, 30), today).toString(),
        question: "eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada bibendum arcu vitae elementum",
        answer: "Non arcu risus quis varius quam. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim",
        thanked: ["David", "Louis", "Inchan"],
        viewed: ["Jose", "Eric", "Caleb"]
      },

      {
        inquirerName: "Michael",
        answerName: "Jose",
        timeAgo: Date.dateDiff('h', new Date(2019, 9, 11, 1, 33, 30), today).toString(),
        question: "eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada bibendum arcu vitae elementum",
        answer: "Non arcu risus quis varius quam. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim",
        thanked: ["David", "Louis", "Inchan"],
        viewed: ["Jose", "Eric", "Caleb"]
      },

      {
        inquirerName: "Michael",
        answerName: "Jose",
        timeAgo: Date.dateDiff('h', new Date(2019, 9, 11, 1, 33, 30), today).toString(),
        question: "eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada bibendum arcu vitae elementum",
        answer: "Non arcu risus quis varius quam. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim",
        thanked: ["David", "Louis", "Inchan"],
        viewed: ["Jose", "Eric", "Caleb"]
      },

      {
        inquirerName: "Michael",
        answerName: "Jose",
        timeAgo: Date.dateDiff('h', new Date(2019, 9, 11, 1, 33, 30), today).toString(),
        question: "eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada bibendum arcu vitae elementum",
        answer: "Non arcu risus quis varius quam. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim",
        thanked: ["David", "Louis", "Inchan"],
        viewed: ["Jose", "Eric", "Caleb"]
      },
    
];