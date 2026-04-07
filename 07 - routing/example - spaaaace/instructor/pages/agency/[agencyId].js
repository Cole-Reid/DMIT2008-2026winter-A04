// react hooks
import { useState, useEffect } from 'react';

// nextjs routing
import { useRouter } from 'next/router';

// our functions
import { getAgency } from '@utils/api/agencies';

// mui components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

// our components
import NavBar from '@components/NavBar';
import SimpleDetailsCard from '@components/SimpleDetailsCard'
import LoadingCircle from '@components/LoadingCircle'


export default function Agency() {

  const router = useRouter()
  const { agencyId } = router.query // good ol' destructuring

  const [agencyData, setAgencyData] = useState(null)

  useEffect(() => {
    getAgency(agencyId).then((data) => {
      console.log(data)
      setAgencyData(data)
    })
    }, [])

  return (
    <>
      
      <NavBar />

      { !agencyData ?
          <LoadingCircle />
        :
          <Container sx={{ paddingTop: 2 }}>
            <Grid container>

              <Grid item xs="2">
                <img
                    alt={agencyData.name}
                    src={agencyData.logo_url}
                    style={{
                        width: `120px`
                    }}
                />
              </Grid>

              <Grid item xs="10">
                <Typography variant="h3" gutterBottom>
                  {`${agencyData.name} (${agencyData.abbrev})`}
                </Typography>
              </Grid>

              <Grid item xs="4">
                <SimpleDetailsCard 
                    title={'Total Launches'}
                    description={agencyData.total_launch_count}
                />
              </Grid>

              <Grid item xs="4">
                <SimpleDetailsCard 
                    title={'Successful Launches'}
                    description={agencyData.successful_launches}
                />
              </Grid>

              <Grid item xs="4">
                <SimpleDetailsCard 
                    title={'Successful Landings'}
                    description={`${agencyData.successful_landings}`}
                />
              </Grid>

              <Grid item xs="4">
                <Typography variant="h5">
                    {`Agency Information`}
                </Typography>
                <SimpleDetailsCard 
                    title={'administrator'}
                    description={`${agencyData.administrator}`}
                />
                <SimpleDetailsCard 
                    title={'Space Agency Details'}
                    description={`Founded ${agencyData.founding_year}`}
                    subDescription={agencyData.description}
                />
              </Grid>

              <Grid item xs="4">
                <Typography variant="h5">
                    {`SpaceCraft`}
                </Typography>
                { agencyData.spacecraft_list && agencyData.spacecraft_list.map((spaceCraft)=> {
                    return <SimpleDetailsCard 
                        key={spaceCraft.id}
                        description={`${spaceCraft.name}`}
                        buttonCallback={()=> {
                          router.push(`/spacecraft/${spaceCraft.id}`)
                        }}
                        buttonName="Go to SpaceCraft"
                      />
                })}
              </Grid>

            </Grid>
          </Container>
      }
    </>
  )
}
