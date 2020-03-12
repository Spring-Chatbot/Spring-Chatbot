import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    // Paper,
    Card,
    CardActions,
    CardContent,
    CardActionArea,
    Button,
    Grid,
    TextField
} from "@material-ui/core";

class Header extends React.Component{
    render(){
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" align='center' className="header">
                            Welcome to Chatbot
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container justify="center" style={{ paddingTop: 200 }}>
                    <Grid item xs={2}>
                        <Card className="login">
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" align="center">
                                        User Login
                                    </Typography>
                                    <TextField required id="standard-required" label="Username" />
                                    <TextField required id="standard-required" label="Password" />
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" variant="outlined">
                                    Register
                                </Button>
                                <Button size="small" color="primary" variant="outlined">
                                    Login
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default Header;
