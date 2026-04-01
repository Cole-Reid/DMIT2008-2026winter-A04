// api functions
import { deleteReview } from '../api/reviews';

// mui components
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';


export default function ReviewCard({ review, reviews, onReviewsChange }) {

  const getRatingColour = (rating) => {

    if (!isNaN || !(1 <= rating <= 10)) {
      throw new RangeError(
        `Rating must be a number 1 and 10 inclusively. Got: ${rating}`
      )
    }

    const ranges = [
      { max: 3,  display: 'red'    },
      { max: 6,  display: 'orange' },
      { max: 8,  display: 'green'  },
      { max: 10, display: 'blue'   },
    ];

    // <= is greater than or equal to, *not* an arrow in the opposite direction!
    // i.e.: "return the first 'max' that's greater than or equal to 'rating'"
    const colour = ranges.find(
      ({ max }) => rating <= max  // destructuring in action! :)
    )

    return colour.display
  }

  const deleteRating = (reviewToDelete) => {

    // remember, Array.filter() returns a new array! This is handy for us, because
    // state variables are immutable, so we always need to fully reconstruct what we
    // pass to the setter.

    // this is just constructing data so far; we're not writing anything to the setter
    let filteredReviews = reviews.filter(
      (review) => {
        return reviewToDelete.id !== review.id
      }
    )
    
    // Instead, what I can do for much nicer safety is pass the whole review obj
    // to deleteRating so that if the API delete fails, I can reinclude it in the array.
    // When we were just passing the ID, there was no nice/clean way to get it back.--
    try {
      deleteReview(reviewToDelete.id);   // this is where I expect things to fail
      onReviewsChange(filteredReviews);  // if they don't, then change state
    } catch (e) {
      // I don't technically need to make this change here, since in the prev. version,
      // *if* the API function failed, the setter wouldn't change review contents anyway.
      // But, if we had more complex logic etc., I want to demo some example of 'readding'
      // the thing we failed to delete.
      onReviewsChange([...filteredReviews, reviewToDelete]) // readd the review that failed to API-delete

      const msg = `Error deleting Review ${reviewToDelete.id}: ${e.message} `
      console.log(msg)
      alert(msg)
    }
  }
  
  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: getRatingColour(review.rating) }} aria-label="recipe">
            {review.rating}
          </Avatar>
        }
        
        action={
          <IconButton onClick={() => {deleteRating(review)}}>
            <DeleteIcon />
          </IconButton>
        }

        title={
          <Typography variant="body2" color="text.secondary">
            {review.title}
          </Typography>
        }
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {review.comment}
        </Typography>
      </CardContent>
    </Card>
  )
}
