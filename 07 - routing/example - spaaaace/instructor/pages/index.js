// react hooks
import { useState, useEffect } from 'react';

import { getAgencies } from '@utils/api/agencies'

// mui components
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import AgencyCard from '@components/AgencyCard';
import NavBar from '@components/NavBar';


export default function Home() {

  const [agenciesData, setAgenciesData] = useState([])

  const [isLoading, setIsLoading]       = useState(true)

  useEffect(
    // param1: callback / logic that should fire
    () => {

      setIsLoading(true);

      getAgencies().then(
        (data) => {
          console.log(data)
          setAgenciesData(data.results)
        }
      )

      setIsLoading(false)

    },
    // param 2: dependency array (here: empty, only fire when component mounts)
    []
  )

  return (
    <div>

        <NavBar />

        <Container sx={{paddingTop:2}} component="main" maxWidth="xs">

          <Typography variant="h3">
            Space Agencies
          </Typography>

          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          </Box>
          {isLoading ? 
            (
              <Typography variant="p">
                Loading data...
              </Typography>
            ) : (
              agenciesData.map((agency)=> {
                return <AgencyCard
                  key={agency.id}
                  id={agency.id}
                  imageUrl={agency.image_url}
                  name={agency.name}
                  abbreviation={agency.abbrev}
                  description={agency.description}
                />
              })         
            )
          }

        </Container>

    </div>
  )
}
