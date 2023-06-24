import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../../../components/AppBar";
import AppContainer from "../../../../components/AppContainer";
import { red } from "@mui/material/colors";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import RocketOutlinedIcon from "@mui/icons-material/RocketOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import {
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const forumData = {
  accountId: "98767-888-78767",
  username: "tanaypratap",
  name: "Tanay Pratap",
  picUrl: "http://bit.ly/42Zm7tM",
  posts: [
    {
      postId: "36635-787-65778",
      username: "tanaypratap",
      name: "Tanay Pratap",
      picUrl: "http://bit.ly/42Zm7tM",
      post: "Join InvactHQ for MBA",
      postDescription:
        "Non programmers on my timeline. Attention! After placing 100+ programmers i in top Indian startups, I am thinking of coming up with a program for business roles as well. Interested in helping me build this course? Join me at Invact.",
      upvotes: 350,
      downvotes: 50,
      tags: ["mba", "business", "bootcamp"],
      createdAt: "2023-06-24T12:00:00Z",
      comments: [
        {
          commentId: "89898-856-87576",
          username: "ashwin4real",
          picUrl: "http://bit.ly/42Zm7tM",
          likes: 0,
          comment: "Interested",
          createdAt: "2023-06-24T12:01:00Z",
        },
      ],
      isBookmarked: false,
    },
    {
      postId: "36698-343-321232",
      username: "trishajain",
      name: "Trisha Jain",
      picUrl: "http://bit.ly/42Zm7tM",
      post: "Can I learn HTML, CSS, and JavaScript in 1 year?",
      postDescription:
        "I am looking to make my career in web development and want to learn these technologies. Can I learn these in 1 year and get a job?",
      upvotes: 150,
      downvotes: 0,
      tags: ["html", "javascript", "web development"],
      createdAt: "2023-06-24T12:54:00Z",
      comments: [],
      isBookmarked: false,
    },
  ],
};

const Home = () => {
  const [postData, setPostData] = useState(forumData.posts);

  const sortOptions = [
    { value: 1, label: "Latest Posts" },
    {
      value: 2,
      label: "Most Upvoted",
    },
  ];

  const [sortValue, setSortValue] = useState(null);

  const handleChangeSort = (e) => {
    setSortValue(e.target.value);

    if (e.target.value == 2) {
      setPostData(
        forumData.posts?.sort((a, b) => {
          return b.upvotes - a.upvotes;
        })
      );
    } else {
      setPostData(
        forumData.posts?.sort((a, b) => {
          const date1 = dayjs(a?.createdAt);
          const date2 = dayjs(b?.createdAt);
          return date2.diff(date1);
        })
      );
    }
  };

  console.log(postData);

  const handleUpvote = (postId) => {
    setPostData((prev) =>
      prev.reduce((acc, curr) => {
        let anObj = [];
        if (curr?.postId == postId) {
          let thisObj = { ...curr, upvotes: curr.upvotes + 1 };
          // anObj.push(thisObj);
          return [...acc, thisObj];
        } else {
          // anObj.push({ ...curr });
          return [...acc, curr];
        }
        return [acc, ...anObj];
      }, [])
    );
  };

  return (
    <AppContainer>
      <ResponsiveAppBar />
      <Box sx={{ height: "100vh", background: "lightgray" }}>
        <Grid container spacing={2}>
          <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                position: "sticky",
                // background: "pink",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                p: 2,
                m: 2,
                gap: 2,
                width: "80%",
                color: "#000",
              }}
            >
              <Button
                type="primary"
                startIcon={<HomeOutlinedIcon />}
                sx={{ color: "#000" }}
              >
                Home
              </Button>
              <Button
                type="primary"
                startIcon={<RocketOutlinedIcon />}
                sx={{ color: "#000" }}
              >
                Explore
              </Button>{" "}
              <Button
                sx={{ color: "#000" }}
                type="primary"
                startIcon={<BookmarkBorderIcon />}
              >
                Bookmarks
              </Button>
              <Button
                sx={{ color: "#000" }}
                type="primary"
                startIcon={<PersonOutlineOutlinedIcon />}
              >
                Profile
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {postData?.map((item, index) => {
                return (
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ p: 1 }}>
                      <IconButton
                        onClick={() => {
                          handleUpvote(item?.postId);
                        }}
                      >
                        <ArrowCircleUpOutlinedIcon
                          sx={{
                            color:
                              item?.upvotes - item?.downvotes >= 0
                                ? "blue"
                                : "",
                          }}
                        />
                      </IconButton>
                      <Typography>{item?.upvotes - item?.downvotes}</Typography>
                      <IconButton>
                        <ArrowCircleDownOutlinedIcon
                          sx={{
                            color:
                              item?.upvotes - item?.downvotes < 0 ? "blue" : "",
                          }}
                        />
                      </IconButton>
                    </Box>
                    <Card
                      sx={{
                        pt: 2,
                        pl: 1,
                        // maxWidth: 345
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          gap: 2,
                        }}
                      >
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          {item?.username[0]}
                        </Avatar>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                          }}
                        >
                          <Typography variant="subtitle1">
                            Posted by @{item?.username}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            {dayjs(item?.createdAt).fromNow()}
                          </Typography>
                        </Box>
                      </Box>

                      <CardContent>
                        <Typography variant="h6" textAlign="start">
                          <b>{item?.post}</b>
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, py: 0.5 }}>
                          {item?.tags?.map((item, index) => {
                            return <Chip label={item} color="primary" />;
                          })}
                        </Box>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          textAlign="start"
                        >
                          {item?.postDescription}
                        </Typography>
                      </CardContent>
                      <Divider />
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <IconButton
                          aria-label="comment"
                          onClick={() => {
                            // likePost(item?.id);
                          }}
                        >
                          <ChatBubbleOutlineIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                        <IconButton>
                          <BookmarkBorderIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                position: "sticky",
                display: "flex",
                flexDirection: "column",
                p: 2,
                m: 2,
                gap: 2,
                width: "80%",
              }}
            >
              <Typography variant="h6">Sort By</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortValue}
                  onChange={handleChangeSort}
                >
                  {sortOptions?.map((item, index) => {
                    return (
                      <MenuItem value={item?.value}>{item?.label}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AppContainer>
  );
};

export default Home;
