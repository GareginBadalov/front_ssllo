import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux-state/async-actions/fetchCars';
import {setAutomobileId, setRealAutoId} from '../../redux-state/reducers/contractFormReducer';
import { toggleAutoDialog } from '../../redux-state/reducers/DialogsReducer';
import {setActiveCar} from "../../redux-state/reducers/listsReducer";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    input: {
        border: '1px solid white',
        marginLeft: theme.spacing(1),
        width: '20%',
        color: 'white'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AutoDialog() {
    const dispatch = useDispatch()
    const autoList = useSelector(state => state.lists.cars)
    const classes = useStyles();
    const open = useSelector(state => state.dialogs.auto)

    const handleClickOpen = () => {
        dispatch(toggleAutoDialog(true))
    };

    const handleClose = () => {
        dispatch(toggleAutoDialog(false))
    };
    const [inValue, setInValue] = useState('');
    function filterByValue(item) {
        if (inValue === '') {
            return true
        }
        return item?.name?.toLowerCase().indexOf(inValue.toLowerCase()) !== -1 || item?.gos_number?.indexOf(inValue) !== -1;
    }
    React.useEffect(() => {
        dispatch(fetchCars())
    }, [])
    return (
        <div>
            <IconButton color="primary"
                onClick={
                    () => {
                        handleClickOpen(true)
                    }
                }
            >
                <ArrowDropDownCircleIcon />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Автомобили
                        </Typography>
                        <OutlinedInput
                            className={classes.input}
                            value={inValue}
                            onChange={(event) => setInValue(event.target.value)}
                            id="outlined"
                            label="Outlined"
                            variant="outlined"
                            placeholder="Поиск"
                        />
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem style={{ background: 'red' }}>
                        <ListItemText primary="Айди" />
                        <ListItemText primary="Гос номер" />
                        <ListItemText primary="Модель машины" />
                    </ListItem>
                    {inValue !== ''
                        ?autoList.filter(filterByValue)
                        .map(el =>
                            <React.Fragment
                                key={el.id}
                            >
                                <ListItem style={{ background: el.red_stat ? 'pink' : 'transparent' }} button
                                          onClick={
                                              () => {
                                                  dispatch(setRealAutoId({ id: el.id,
                                                      gos_number: el.gos_number,
                                                      name: el.name + ', ' + el.gos_number}));
                                                  dispatch(setAutomobileId({
                                                      id: el.tarif?.id,
                                                      name:  el.tarif?.name,
                                                      tariff: el.tarif?.tarif_one_two}));
                                                  dispatch(setActiveCar(el.tarif));
                                                  dispatch(toggleAutoDialog(false));
                                              }
                                          }
                                >
                                    <ListItemText primary={el.id} />
                                    <ListItemText primary={el.gos_number} />
                                    <ListItemText primary={el.name} />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ).slice(0, 2)
                        :autoList.map(el =>
                                <React.Fragment
                                    key={el.id}
                                >
                                    <ListItem style={{ background: el.red_stat ? 'pink' : 'transparent' }} button
                                              onClick={
                                                  () => {
                                                      dispatch(setRealAutoId({ id: el.id,
                                                          gos_number: el.gos_number,
                                                          name: el.name + ', ' + el.gos_number}));
                                                      dispatch(setAutomobileId({
                                                          id: el.tarif?.id,
                                                          name:  el.tarif?.name,
                                                          tariff: el.tarif?.tarif_one_two}));
                                                      dispatch(setActiveCar(el.tarif));
                                                      dispatch(toggleAutoDialog(false));
                                                  }
                                              }
                                    >
                                        <ListItemText primary={el.id} />
                                        <ListItemText primary={el.gos_number} />
                                        <ListItemText primary={el.name} />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            )
                    }


                </List>
            </Dialog>
        </div>
    );
}

export default React.memo(AutoDialog);