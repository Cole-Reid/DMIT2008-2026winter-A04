import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';


export default function ReviewCard({
  ratingId,
  rating,
  title,
  comment,
  reviews,
  onReviewsChange
}) {

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

  const deleteRating = (ratingId) => {
    // remember, Array.filter() returns a new array! This is handy for us, because
    // state variables are immutable, so we always need to fully reconstruct what we
    // pass to the setter.
    let filteredReviews = reviews.filter(
      (review) => {
        return ratingId !== review.id
      }
    )
    onReviewsChange(filteredReviews)
  }
  
  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: getRatingColour(rating) }} aria-label="recipe">
            {rating}
          </Avatar>
        }
        
        action={
          <IconButton onClick={() => {deleteRating(ratingId)}}>
            <DeleteIcon />
          </IconButton>
        }

        title={
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        }
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment}
        </Typography>
      </CardContent>
    </Card>
  )
}
