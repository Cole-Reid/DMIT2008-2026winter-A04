// nextjs routing
import { useRouter } from 'next/router';

// mui components
// reference for Card stuff: https://mui.com/material-ui/react-card/#media
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AgencyCard({ id, imageUrl, name, abbreviation, description }) {

    const router = useRouter()

    const navigateToAgencyPage = () => {
      // router.push: programmatically navigate to new URL path
      //              I *could* wrap in a Link here, but want to demo this.
      router.push(`/agency/${id}`)
    }

    return <Card sx={{ marginTop: "8px", maxWidth: 345 }}>
    {imageUrl && <CardMedia
      component="img"
      height="140"
      image={imageUrl}
      alt="green iguana"
    />}
    <CardContent>
      <Typography variant="h5" component="div">
        {name}
      </Typography>
      <Typography gutterBottom variant="body2" component="div">
        {abbreviation}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        onClick={navigateToAgencyPage}
      >
        Go to Agency
      </Button>
    </CardActions>
  </Card>
}