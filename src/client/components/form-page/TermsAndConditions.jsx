import React from 'react';
import { Typography, Button, Link, Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Card from '../card/Card';

const useStyles = makeStyles(theme => ({
  image: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(4),
  },
}));

const UnivalleURL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Univalle.svg/1200px-Univalle.svg.png';
const SemilleroURL =
  'https://assets.isu.pub/document-structure/200910202646-e04ba63e6e23b4decece88b4f4166831/v1/99f251e63e0005ad70a25cdb1fb8e4bf.jpg';
const UnivallePolitics =
  'https://doc-0g-2k-docs.googleusercontent.com/docs/securesc/blu3b9fud1rd5it82at71gemb1kkl9j5/qaaa46s4ep7mm6kh0c8mf9rotcg8hunv/1661610450000/08354279587747375209/11391682284440050027/1e3T8HHdpRvXFqK5dXmAx4EWtU8BhSbTg?e=view&ax=AI9vYm4iyV3Sakdcapzpp8RbxUguvzI6Qa2Pt8hPqQGBrkE2oyrb3akXzTdbWTbo7B1_Ga-bbupHxCjbE_p1CLEZvTdXRKEUEJhFxtFMv6I_O73b5kntNnkxC9aSjXybT35Pk8hF8JNwb6hwek56a3yhmqgDtcc77wkS1_sOtCsUgMDWhmISPWsrrTWYZ6jlA8fQh0DOw4BM3WQhOuBy6O0YH-IssYrsWXyiVX27QDa-680bC2PBwIhs5nd6sz-EvAgf-QNypJzCbxt5hj3fNSTLYyYOJsvkEywRjkndS1Wh-ceSxCbszCe0ZNt-5ctKM8LFbltAoR-YaU9v6CJELf8CTNkgBxvCK5LkKteJmtFBwVwQRV636IO0QAhvCQDbAs3hudQvQUk1jyrj0P_g-8nccH6mFuNfPM9tgDZLpMxOcBlmLHqy0YLrFKDOnWaW6WMhKpQGRSph41qH3AISqRNYiMqjl6IVFiCGrMTxlO8J0bcj134f2hNam55nvbVtnqnMWOm_lF8aTl5-eZUOIh-Uh2648BhNKq3fHfvfKkp53KlxsTngwyRYQuAdqK8oFnOCeVx9EEmWra1h0K_gJKAwIJqE7ufxokGYfGlHariW1wfith6br0OFYMCHNTS5RuL-8ELxkeEYVkaMlJJwYI7MhmJT7evBGL7xNm0I0m1gbEdgs2s0koKLpP7miEOfSYnJucjA35x-xVPw3UFVN2Xtgyj3qjwn5ug-35p4EWKShT4P8yP7e-fQnv8b_7wTetkjpIT4R6Ot9_nW0r7fMx8ckxVdj3JARva5EmAT1MA4uHtOg5YqhwSRMHKgBw&uuid=502a62bd-ad00-49f2-8224-ec42cdd679e7&authuser=0&nonce=gb4t5pdgre5r8&user=11391682284440050027&hash=ap4sfkqd2slj9prishn4b05ee95gaatj';

export default function TermsAndConditions({ onClick }) {
  const classes = useStyles();

  return (
    <Card>
      <Box>
        <img
          width={80}
          height={'auto'}
          className={classes.image}
          src={UnivalleURL}
        />
        <img
          width={140}
          height={'auto'}
          className={classes.image}
          src={SemilleroURL}
        />
      </Box>
      <Typography variant="h1" paragraph align="center">
        Formulario de inscripción al Semillero
      </Typography>
      <Grid container>
        <Grid item md={4} container justifyContent="center">
          <VerifiedUserIcon
            color="primary"
            style={{ marginTop: 80, width: 100, height: 100 }}
          />
        </Grid>
        <Grid item md={8}>
          <Typography variant="h2" paragraph>
            Términos y condiciones
          </Typography>
          <Typography paragraph>
            Al enviar este formulario usted autoriza a la Universidad de Valle
            de que maneje sus datos personales con fines academicos, estudios
            estadisticos y/o socioeducativos.
          </Typography>
          <Typography paragraph>
            He leido y acepto las Condiciones generales y estoy de acuerdo con
            la Politica de privacidad al respecto del tratamiento de datos
            personales de la Universidad del Valle.
          </Typography>
          <Link href={UnivallePolitics}>{UnivallePolitics}</Link>
          <Box
            mt={6}
            mb={2}
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <Button
              color="primary"
              variant="contained"
              onClick={onClick}
              className={classes.button}
            >
              Acepto
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
