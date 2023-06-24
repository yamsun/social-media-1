import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../../../components/AppBar";
import AppContainer from "../../../../components/AppContainer";
import { red } from "@mui/material/colors";

import {
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { useAuth } from "../../../../context/auth-context";

const Home = () => {
  const [postData, setPostData] = useState([]);

  const likePost = (postId) => {
    axios.post(`/api/posts/like/${postId}`, {
      Headers: {
        authorization: authValue.token,
      },
    });
  };

  const authValue = useAuth();

  useEffect(() => {
    axios
      .get(`/api/posts`)
      .then((res) => {
        console.log("post res", res);
        setPostData(res?.data?.posts);
      })
      .catch((err) => console.log("err", err));
  }, []);
  return (
    <AppContainer>
      <ResponsiveAppBar />
      <Box sx={{ height: "100vh", background: "#bada55" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box
              sx={{
                position: "sticky",
                background: "pink",
                display: "flex",
                flexDirection: "column",
                p: 2,
                m: 2,
                gap: 2,
                width: "80%",
              }}
            >
              <Button type="primary">Home</Button>
              <Button type="primary">Explore</Button>{" "}
              <Button type="primary">Bookmarks</Button>
              <Button type="primary">Profile</Button>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ border: "2px solid red" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {postData?.map((item, index) => {
                return (
                  <Card
                    sx={
                      {
                        // maxWidth: 345
                      }
                    }
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          {item?.username[0]}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={item?.username}
                      subheader="September 14, 2016"
                    />
                    {item?.image && (
                      <CardMedia
                        component="img"
                        height="194"
                        image={item?.image}
                        alt="Paella dish"
                      />
                    )}
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {item?.content}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => {
                          likePost(item?.id);
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      go
                    </CardActions>
                  </Card>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                position: "sticky",
                background: "pink",
                display: "flex",
                flexDirection: "column",
                p: 2,
                m: 2,
                gap: 2,
                width: "80%",
              }}
            >
              <Button type="primary">Home</Button>
              <Button type="primary">Explore</Button>{" "}
              <Button type="primary">Bookmarks</Button>
              <Button type="primary">Profile</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AppContainer>
  );
};

export default Home;
