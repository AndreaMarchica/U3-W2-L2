import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

function CommentArea({ asin }) {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  // componentDidUpdate = async (prevProps) => {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       isLoading: true,
  //     });
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" + asin,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhZjBiYWY2ZTNkZDAwMTQ5NWU2NWYiLCJpYXQiOjE2OTg3NTg0OTYsImV4cCI6MTY5OTk2ODA5Nn0.puJzuv2UtHdwmw68xk1DAGGD_5nBV3IT582Jxlq2xh8",
            },
          }
        );
        console.log(response);
        if (response.ok) {
          let comments = await response.json();
          setComments(comments);
          setIsLoading(false);
          setIsError(false);
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    };
    fetchData();
  }, [asin]);

  <div className="text-center">
    {isLoading && <Loading />}
    {isError && <Error />}
    <AddComment asin={asin} />
    <CommentList commentsToShow={comments} />
  </div>;
}

export default CommentArea;
