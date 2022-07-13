import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

export function App() {
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    axios({
      url: `https://api.github.com/users/silverorange/repos`,
      // params: {
      //   fork: false,
      // },
    }).then((res) => {
      console.log(res.data);
      setRepo(res.data);
    });
  }, []);

  console.log(repo);

  //filtering through the data to get back the data that returns fork:false
  const filter = repo.filter((data) => {
    return (data.fork === false);
    })

  //using the array method sort() to reverse chronological order by date
  const sort = filter.sort(function (a, b) {
    return new Date(a.created_at) - new Date(b.created_at);
  });

}

//Pseudo-Code

//First I made an axios call within a useEffect to call it once on component mount, to retrieve the json data from the API. I logged it out in the console.
//I then want to loop through (with the array method filter) to return only the objects that return the boolean value of fork: false.
//To reverse chronological order them, I used the sort array method.
//Store the values (name, desciption, language, forks count) in a variable and display them on the page using the map array method. They were displayed in the return (within a <ul> tag).
//I will use another sort array method for that when a button is clicked, it only displays the list items that have that particular language.
//Using and anchor tag, I will make the repositories clickable.
//Using routes, route, Link and outlet, I will make a new repository to have the data listed. A new component will be made to hold that data.



export default App;
