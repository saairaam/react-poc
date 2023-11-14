import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//=== google firebase import start ===
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// ===================================
import { toast } from "react-toastify";

const Contextpage = createContext();

export function MovieProvider({ children }) {
  const [header, setHeader] = useState("Trending");
  const [totalPage, setTotalPage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [page, setPage] = useState(1);
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([]);
  const [loader, setLoader] = useState(true);
  const [backgenre, setBackGenre] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const APIKEY = "81641874fb2655f9a557bc338d178253";

  const movieData = [
    {
      genre_ids: [28, 18, 10752],
      id: 554600,
      overview:
        "Following the roguish terrorist attacks at Uri Army Base camp in Kashmir, India takes the fight to the enemy, in its most successful covert operation till date with one and only one objective of avenging their fallen heroes.",
      popularity: 717.773,
      image: "/yNySAgpAnWmPpYinim9E0tUzJWG.jpg",
      release_date: "2019-01-11",
      title: "Uri: The Surgical Strike",
    },
    {
      genre_ids: [28, 12, 18, 14],
      id: 734253,
      overview:
        "7000 years ago, Ayodhya's Prince Raghava and Prince Sesh along with the Mighty Vanar Warriors travels to the island of Lanka with an aim to rescue Raghava's wife Janaki, who has been abducted by Lankesh, the king of Lanka.",
      popularity: 266.325,
      image: "/bNY8xxtLm0HtdPS0kBttK3WKGQf.jpg",
      release_date: "2023-06-16",
      title: "Adipurush",
    },
    {
      genre_ids: [28, 53],
      id: 1034587,
      overview:
        "Siddharth, a youngman who runs a family business is astonished to find his doppelgängers Manjunath and Michael on getdopple.com. After meeting up in Goa, they come down to Hyderabad to help Siddarth win over Ishika, a girl looking for superman to be her husband. But things take a drastic turn when NIA swings into action to nab Michael, aka Bipin Roy.",
      popularity: 164.9,
      image: "/mhPhEvh2ffBdbgiSIjrlkqAGwNH.jpg",
      release_date: "2023-02-10",
      title: "Amigos",
    },
    {
      genre_ids: [28, 12, 53],
      id: 872906,

      overview:
        "An emotional journey of a prison warden, driven by a personal vendetta while keeping up to a promise made years ago, recruits inmates to commit outrageous crimes that shed light on corruption and injustice, in an attempt to get even with his past,  and that leads him to an unexpected reunion.",
      popularity: 169.242,
      image: "/hHKTXxJ3lN8ruHAg5YvpXIQtjc7.jpg",
      release_date: "2023-09-07",
      title: "Jawan",
    },
    {
      genre_ids: [28, 18],
      id: 997391,
      overview:
        "Once-menacing, anger fueled, trained martial arts fighters Robert, Dony and Xavier settle down to peaceful lives, after a significant event prompts them. Fate orchestrates their reunion and return from exile to their fighting ways, when their history linger ominously and one of them faces a violent attack.",
      popularity: 178.934,
      image: "/y6QRQ0bHGt9Wc1BBTZsa1iB2PAm.jpg",
      release_date: "2023-08-25",
      title: "RDX: Robert Dony Xavier",
    },
    {
      genre_ids: [28, 53],
      id: 949229,
      overview:
        "A mild-mannered man becomes a local hero through an act of violence, but it brings forth consequences with connection to a dangerous world, one which will shake his carefully constructed life to its very core.",
      popularity: 88.113,
      image: "/msnySAFZY7yB4rtKEFodbyismH0.jpg",
      release_date: "2023-10-19",
      title: "Leo",
    },
    {
      genre_ids: [18, 10751, 28, 10749],
      id: 371676,
      overview:
        "Raja, who thinks his mother is dead, turns into a thief. However, his life changes when he falls for Mounika, a girl who is escaping a forced marriage, and eventually meets her aunt.",
      popularity: 64.792,
      image: "/qXrIBBugDIgjd7mm6XqDj256gCx.jpg",
      release_date: "2015-12-18",
      title: "Loafer",
    },
    {
      genre_ids: [28, 18],
      id: 579974,
      overview:
        "A fictional history of two legendary revolutionaries' journey away from home before they began fighting for their country in the 1920s.",
      popularity: 49.688,
      image: "/ljHw5eIMnki3HekwkKwCCHsRSbH.jpg",
      release_date: "2022-03-24",
      title: "RRR",
    },
    {
      genre_ids: [28, 53],
      id: 379149,
      overview:
        "Quan is a humble London businessman whose long-buried past erupts in a revenge-fueled vendetta when the only person left for him to love – his teenage daughter – dies in an Irish Republican Army car bombing. His relentless search to find the terrorists leads to a cat-and-mouse conflict with a British government official whose own past may hold the clues to the identities of the elusive killers.",
      popularity: 39.402,
      image: "/rwM4hzrmc5HiWfQD9ls9DL4QgGl.jpg",
      release_date: "2017-09-28",
      title: "The Foreigner",
    },
    {
      genre_ids: [28, 12, 18],
      id: 256040,
      overview:
        "The young Shivudu is left as a foundling in a small village by his mother. By the time he’s grown up, it has become apparent that he possesses exceptional gifts. He meets the beautiful warrior princess Avanthika and learns that her queen has been held captive for the last 25 years. Shividu sets off to rescue her, discovering his own origins in the process.",
      popularity: 34.074,
      image: "/9BAjt8nSSms62uOVYn1t3C3dVto.jpg",
      release_date: "2015-07-10",
      title: "Bāhubali: The Beginning",
    },
    {
      genre_ids: [28, 12, 14],
      id: 350312,

      overview:
        "When Mahendra, the son of Bāhubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.",
      popularity: 31.612,
      image: "/21sC2assImQIYCEDA84Qh9d1RsK.jpg",
      release_date: "2017-04-27",
      title: "Bāhubali 2: The Conclusion",
    },
    {
      genre_ids: [28, 18],
      id: 720557,
      overview:
        "Following the events of Tiger Zinda Hai, War, and Pathaan, Avinash Singh Rathore returns as Tiger but this time the battle is within. He has to choose between his country or family as an old enemy is after his life, who claims that his family was killed by Tiger. He holds Tiger captive in Pakistan as the Indian agent's loyalty towards his country faces its biggest test.",
      popularity: 31.138,
      image: "/lQen4Ws4N7CZFug3HYs2XXji1B.jpg",
      release_date: "2023-11-12",
      title: "Tiger 3",
    },
    {
      genre_ids: [28, 35, 80],
      id: 783461,

      overview:
        "When her boyfriend loses a mobster's cash, Savi races against the clock to save the day — if only she can break out of a curious cycle of dead ends.",
      popularity: 26.061,
      image: "/onGdT8sYi89drvSJyEJnft97rOq.jpg",
      release_date: "2022-02-04",
      title: "Looop Lapeta",
    },
    {
      genre_ids: [28, 12, 53],
      id: 864692,

      overview:
        "A soldier caught by enemies and presumed dead comes back to complete his mission, accompanied by old companions and foes.",
      popularity: 25.539,
      image: "/luQFzuHn6IeRdgmXf1DfrYDPO5l.jpg",
      release_date: "2023-01-25",
      title: "Pathaan",
    },
    {
      genre_ids: [28, 10749, 18],
      id: 1031973,

      overview:
        "The prodigal son of a respected leader takes on two political rivals and forms bonds with their daughters.",
      popularity: 31.052,
      image: "/yptFZA0VzjZMBoKgLml49pI6Ckn.jpg",
      release_date: "2023-09-27",
      title: "Skanda",
    },
    {
      genre_ids: [28, 80, 53],
      id: 592508,

      overview:
        "A fearless, faithful albeit slightly forgetful Mumbai cop, Veer Sooryavanshi, the chief of the Anti-Terrorism Squad in India pulls out all the stops and stunts to thwart a major conspiracy to attack his city.",
      popularity: 22.261,
      image: "/oCymRm6FG62zrKnXiHHJvDgkYoA.jpg",
      release_date: "2021-11-05",
      title: "Sooryavanshi",
    },
    {
      genre_ids: [28, 53, 12],
      id: 585268,

      overview:
        "Khalid, entrusted with the task of eliminating former soldier turned rogue Kabir, engages in an epic battle with his mentor who taught him everything.",
      popularity: 16.729,
      image: "/7JeHrXR1FU57Y6b90YDpFJMhmVO.jpg",
      release_date: "2019-10-02",
      title: "War",
    },
    {
      genre_ids: [28, 35, 18],
      id: 628241,

      overview:
        "Fate plays a vital role in connecting the life of Bantu, a son who seeks validation from his cold-hearted father with the life of Raj, whose millionaire father wishes that he was more assertive.",
      popularity: 14.996,
      image: "/48DIQOSEgpoWUFBrmHW2En6aNZQ.jpg",
      release_date: "2020-01-12",
      title: "Ala Vaikunthapurramuloo",
    },
    {
      genre_ids: [18, 28],
      id: 619329,
      overview:
        "In a Village Where they used to Honor Kill Love couples of the opposite cast and in that village A girl and boy from the opposite cast who used to be friends are getting pressure from village people that they love each other . What happens at the End?\r Whether they succeed or not is the story.",
      popularity: 18.647,
      image: "/k7iEwxmphkr1bwb66CHA4dhyyBF.jpg",
      release_date: "2023-04-07",
      title: "Munthiri Kaadu",
    },
    {
      genre_ids: [14, 28, 12],
      id: 496331,

      overview:
        "The story of Shiva – a young man on the brink of an epic love, with a girl named Isha. But their world is turned upside down when Shiva learns that he has a mysterious connection to the Brahmāstra... and a great power within him that he doesn’t understand just yet - the power of Fire.",
      popularity: 21.136,
      image: "/x61qdvHIsr9U53FwoLVDQqAGur0.jpg",
      release_date: "2022-09-08",
      title: "Brahmāstra Part One: Shiva",
    },
  ];
  useEffect(() => {
    if (page < 1) {
      setPage(1); // Increment page to 1 if it is less than 1.
    }
  }, [page]);

  const filteredGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${activegenre}&api_key=${APIKEY}&with_origin_country=IN&page=${page}`
    );
    const filteredGenre = await data.json();
    console.log(filteredGenre);
    setMovies(movies.concat(filteredGenre.results)); // Concat new movies with previous movies, on genre change movies are reset to [] so that only movies of new genre will appear, check out useEffect on top for more information.
    setTotalPage(filteredGenre.total_pages);
    setLoader(false);
    setHeader("Genres");
  };

  const fetchSearch = async (query) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&with_origin_country=IN&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const searchmovies = await data.json();
    setSearchedMovies(searchmovies.results);
    setLoader(false);
    setHeader(`Results for "${query}"`);
  };

  const fetchGenre = async () => {
    const genres = [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 12,
        name: "Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 14,
        name: "Fantasy",
      },
      {
        id: 36,
        name: "History",
      },
      {
        id: 27,
        name: "Horror",
      },
      {
        id: 10402,
        name: "Music",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 10770,
        name: "TV Movie",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "War",
      },
      {
        id: 37,
        name: "Western",
      },
    ];
    setGenres(genres);
  };

  const fetchTrending = async () => {
    setTrending(movieData);
  };

  const fetchUpcoming = async () => {
    setUpcoming(movieData);
  };

  // creat local storage
  const GetFavorite = () => {
    setLoader(false);
    setHeader("Favorite Movies");
  };

  //<========= firebase Google Authentication ========>
  const googleProvider = new GoogleAuthProvider(); // =====> google auth provide

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/");
      toast.success("Login successfully");
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };
  // <==========================================================>

  return (
    <Contextpage.Provider
      value={{
        fetchGenre,
        genres,
        setGenres,
        filteredGenre,
        header,
        setHeader,
        movies,
        setMovies,
        page,
        setPage,
        activegenre,
        setActiveGenre,
        fetchSearch,
        loader,
        setBackGenre,
        backgenre,
        setLoader,
        fetchTrending,
        trending,
        fetchUpcoming,
        upcoming,
        GetFavorite,
        totalPage,
        searchedMovies,
        GoogleLogin,
        user,
        setUser,
      }}
    >
      {children}
    </Contextpage.Provider>
  );
}

export default Contextpage;
