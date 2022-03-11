import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../ui/Navbar'
import moment from 'moment';
import { eventClearActiveEvent, eventStartLoading } from '../../actions/events';
import { CardEvent } from './CardEvent';
import { AgendaModal } from './AgendaModal';
import { Button, Modal } from '@nextui-org/react';
import './AgendaScreen.css';

export const AgendaScreen = () => {

  const [visible, setVisible] = React.useState(false);

  const handler = () => {
    dispatch(eventClearActiveEvent());
    setVisible(true)
  };

  const closeHandler = () => {
    setVisible(false);
  };

  useEffect(() => {
  }, [visible])


  moment.locale('es');
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.evento);

  useEffect(() => {
    dispatch(eventStartLoading())
  }, [dispatch])


  return (
    <div>
      <Navbar />
      <div className="card-columns animate__animated animate__fadeIn">

        <div className="mx-auto" style={{ maxWidth: 540 }} >

          {
            events.map(event => (

              <CardEvent
                key={event.id}
                setVisible={setVisible}
                {...event}
              />


            ))
          }
        </div>


        <Button auto shadow onClick={handler} className="btn-flotante">
          <i className="fas fa-plus"></i>
        </Button>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}

        >
          <Modal.Header>
            <AgendaModal setVisible={setVisible} />
          </Modal.Header>

        </Modal>

      </div>
    </div>
  )
}
