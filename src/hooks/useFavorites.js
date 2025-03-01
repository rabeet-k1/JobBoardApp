const { useSelector, useDispatch } = require("react-redux");
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase";
import { setFavoriteJobs } from "@/redux/slices/FavoriteJobs";

const useFavorites = () => {
  const dispatch = useDispatch();
  const { favoriteJobs } = useSelector((state) => state.FavoriteJobsSlice);
  const { userData } = useSelector((state) => state.AuthenticationSlice);

  const fetchFav = async () => {
    const itemsRef = collection(firestore, "favorites", userData.id, "items");

    const querySnapshot = await getDocs(itemsRef);
    const favoriteItems = querySnapshot.docs.map(async (doc) => {
      const response = await fetch(`https://remotive.com/api/remote-jobs`);
      let resss = await response.json();
      let resulttt = resss.find((jobItem) => jobItem.id == doc.id);
      console.log(resulttt, "resultttresultttresultttresulttt");
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    dispatch(setFavoriteJobs(favoriteItems));
  };

  return { fetchFav, favoriteJobs };
};

export default useFavorites;
