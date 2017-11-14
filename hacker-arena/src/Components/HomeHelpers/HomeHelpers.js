
const HomeHelpers = {

getTime(){
  let ampm = 'AM';
  let time = (new Date() + '').split(' ')[4].split(':');
  if(time[0] > 21) {
    time[0] = time[0] - 12; 
    ampm = 'PM';
  } else if (time[0] > 12) { 
    time[0] = '0' + (time[0] - 12) 
    ampm = 'PM';
  } else if (time[0] === '00'){
    time[0] = '12';
  }
  return time[0] + ':' + time[1] + ' ' + ampm;
},

newDateParser(){
  let x = (new Date() +'').slice(0,15).split(' ');
  let weekComplete = {
    'Mon' : 'Monday',
    'Tue' : 'Tuesday',
    'Wed' : 'Wednesday',
    'Thu' : 'Thursday',
    'Fri' : 'Friday',
    'Sat' : 'Saturday',
    'Sun' : 'Sunday'
  }
  let monthComplete = {
    'Jan' : 'January',
    'Feb' : 'February',
    'Mar' : 'March',
    'Apr' : 'April',
    'May' : 'May',
    'Jun' : 'June',
    'Jul' : 'July',
    'Aug' : 'August',
    'Sep' : 'September',
    'Oct' : 'October',
    'Nov' : 'November',
    'Dec' : 'December'
  }
  return [weekComplete[x[0]],monthComplete[x[1]],x[2],x[3]];
},

quoteGen() {
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }
  let quotes = [
    ["Talk is cheap. Show me the code." , "- Linus Torvalds"],
    ["Programs must be written for people to read, and only incidentally for machines to execute.",  "- Harold Abelson"],
    ["Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live", "- John Woods"],
    ["Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.","- Rick Cook"],
    ["That's the thing about people who think they hate computers. What they really hate is lousy programmers.", "- Larry Niven"],
    ["Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.","- Waseem Latif"],
    ["What one programmer can do in one month, two programmers can do in two months." ,"- Fred Brooks"],
    ["Java is to JavaScript as ham is to hamster.", "- Jeremy Keith"],
    ["One of the best programming skills you can have is knowing when to walk away for awhile.", "- Oscar Godson"],
    ["Damn, I love jQuery", "- Everyone"],
    ["The best thing about a boolean is even if you are wrong, you are only off by a bit.", "- Anonymous"],
    ["Before software can be reusable it first has to be usable.", "- Ralph Johnson"],
    ["There are two ways to write error-free programs; only the third one works.", "- Alan J. Perlis"],
    ["It’s not a bug – it’s an undocumented feature.", "- Anonymous"],
    ["One man’s crappy software is another man’s full time job.", "-Jessica Gaston"],
    ["Deleted code is debugged code.", "- Jeff Sickel"],
    ["In order to understand recursion, one must first understand recursion.", "- Anonymous"],
    ["SPIIIIIIIICCCCYYY. 10-Piece Spicy Nuggets for $1.49. Get ‘em today.", "- Burger King"]
  ]
  let index = getRandomIntInclusive(0,quotes.length-1);
  return quotes[index];
}

}

export default HomeHelpers;