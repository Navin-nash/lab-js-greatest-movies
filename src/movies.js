// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const allDirectors = moviesArray.map(movie => movie.director);
  return [...new Set(allDirectors)];
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(movie => 
    movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  ).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) return 0; // Handle empty array case

  const totalScore = moviesArray.reduce((sum, movie) => {
    // Some movies might not have a score, so handle that by checking if the score exists
    return sum + (movie.score || 0);
  }, 0);

  const averageScore = totalScore / moviesArray.length;
  
  return Number(averageScore.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(movie => movie.genre.includes("Drama"));

  // If there are no drama movies, return 0
  if (dramaMovies.length === 0) return 0;

  // Use the scoresAverage logic to calculate the average score of drama movies
  const totalScore = dramaMovies.reduce((sum, movie) => {
    return sum + (movie.score || 0);
  }, 0);

  const averageScore = totalScore / dramaMovies.length;

  return Number(averageScore.toFixed(2)); 
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  return [...moviesArray].sort((a, b) => {
    // First compare the release year
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    // If the year is the same, sort alphabetically by title
    return a.title.localeCompare(b.title);
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const titles = moviesArray.map(movie => movie.title);

  // Step 2: Sort the titles alphabetically
  titles.sort((a, b) => a.localeCompare(b));

  // Step 3: Return the first 20 titles, or less if there are fewer than 20 movies
  return titles.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map(movie => {
    // Clone the movie object to avoid mutating the original array
    const movieCopy = { ...movie };

    // Split the duration string into hours and minutes
    const duration = movie.duration;

    let totalMinutes = 0;

    // Regex to extract hours and minutes from the string
    const hoursMatch = duration.match(/(\d+)h/); // Find hours part
    const minutesMatch = duration.match(/(\d+)min/); // Find minutes part

    if (hoursMatch) {
      totalMinutes += parseInt(hoursMatch[1]) * 60; // Convert hours to minutes
    }

    if (minutesMatch) {
      totalMinutes += parseInt(minutesMatch[1]); // Add the remaining minutes
    }

    // Replace the duration field with the total minutes
    movieCopy.duration = totalMinutes;

    return movieCopy;
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) return null; // Handle the case when no movies are provided

  // Step 1: Create a dictionary where each year is associated with an array of movie scores
  const scoresByYear = {};

  moviesArray.forEach(movie => {
    const year = movie.year;
    const score = movie.score || 0; // Handle cases where the score might not exist

    // If the year is not already in the dictionary, create an empty array
    if (!scoresByYear[year]) {
      scoresByYear[year] = [];
    }

    // Add the score to the corresponding year
    scoresByYear[year].push(score);
  });

  // Step 2: Calculate the average score for each year
  let bestYear = null;
  let bestAverageScore = 0;

  for (const year in scoresByYear) {
    const scores = scoresByYear[year];
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / scores.length;

    // Step 3: Find the year with the highest average score
    if (averageScore > bestAverageScore || (averageScore === bestAverageScore && year < bestYear)) {
      bestAverageScore = averageScore;
      bestYear = year;
    }
  }

  // Step 4: Return the result in the specified format
  return `The best year was ${bestYear} with an average score of ${bestAverageScore}`;
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
