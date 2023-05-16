import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavourites";
import axios from "axios";
import React, { useMemo, useCallback } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}
const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite",  { movieId  });
    }
    const updatedFavoriteIds = await response?.data?.favoriteIds;
    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutateFavorites, mutate]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavorite}
      className="cursor-pointer
    group/item
    w-6
    h-6
    lg:w-10
    lg:h-10
    border-2
    border-white
    rounded-full
    flex
    justify-center
    items-center
    transition
    hover:border-netural-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
