"use client";
import FavoriteCards from "@/components/favoriteCards";
import useFavorites from "@/hooks/useFavorites";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

export default function Favorites() {
  const { fetchFav, favoriteJobs } = useFavorites();

  useEffect(() => {
    fetchFav();
  }, []);

  return (
    <Box sx={{ background: "#fff", minHeight: "100vh", padding: "30px 20px" }}>
      <Typography variant={"body1"} fontSize={14} color="black" mb={2}>
        Back to{" "}
        <Link
          style={{ color: "blue", textDecorationLine: "underline" }}
          href={"/"}
        >
          Home
        </Link>
      </Typography>

      <Typography
        component="h1"
        sx={{
          color: "black",
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "15px",
        }}
      >
        My Favorites
      </Typography>

      {favoriteJobs?.length > 0 ? (
        <Grid container spacing={3}>
          {favoriteJobs.map((favItem, indddd) => {
            return (
              <Grid key={favItem.id} item xs={12} sm={6} md={4}>
                <FavoriteCards favItem={favItem} index={indddd} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography
          component="h1"
          sx={{
            color: "black",
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "15px",
          }}
        >
          No favorites right now!
        </Typography>
      )}
    </Box>
  );
}
