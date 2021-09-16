import React, { useContext, useState } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';
import TextInput from '../Inputs/TextInput';
import NumberInput from '../Inputs/NumberInput';
import Button from '../Button';
import './UserGrubRequest.scss';
import { GrubContext } from '../../providers/GrubProvider';
import { UserContext } from '../../providers/UserProvider';

const UserGrubRequest = () => {
	const [feedback, setFeedback] = useState('');
	const [openForm, setOpenForm] = useState(false);
	const [grubMessage, setGrubMessage] = useState('');
	const [grubRestaurantName, setGrubRestaurantName] = useState('');
	const [grubUsersRequested, setGrubUsersRequested] = useState('');
	const { user } = useContext(UserContext);
	const { postGrub } = useContext(GrubContext);

	const toggleGrubRequestForm = () => {
		setOpenForm(!openForm);
	};

	const submitGrubPost = () => {
		if (grubMessage && grubRestaurantName && grubUsersRequested) {
			const grubPost = {
				message: grubMessage,
				restaurant: {
					img: '',
					name: grubRestaurantName,
				},
				users_requested: grubUsersRequested,
				users_pending: [],
				status: 'open',
				// TODO: User Id must be set by the logged in user
				user_id: user.id,
			};
			postGrub(grubPost);
			console.log(grubPost);
			setFeedback('');
			setGrubMessage('');
			setGrubRestaurantName('');
			setGrubUsersRequested('');
		} else {
			setFeedback('You must enter all of the required fields');
		}
	};
	return (
		<div className="UserGrubRequest">
			<h2 className="text-primary">Ready for some grub?</h2>
			<TextInput
				label="Send a message with your request"
				placeholder="ie. Too hungry for chinese. Any recommdendations"
				type="text"
				onClick={() => setOpenForm(true)}
				setValue={setGrubMessage}
				value={grubMessage}
			/>
			<Collapse in={openForm}>
				<div className="grub-request-form">
					<Row>
						<Col>
							<NumberInput
								className="text-center"
								label="How many would you like in your party?"
								placeholder="3"
								setValue={setGrubUsersRequested}
								value={grubUsersRequested}
								min="0"
							/>
						</Col>
						<Col>
							<TextInput
								feedback={setFeedback}
								label="Where are you looking to eat?"
								placeholder="Popeyes"
								setValue={setGrubRestaurantName}
								value={grubRestaurantName}
							/>
						</Col>
					</Row>
					{feedback ? (
						<div className="feedback">
							<small>{feedback}</small>
						</div>
					) : null}
					<Row className="d-flex justify-content-center">
						<Col xs={4}>
							<Button
								className="mx-auto"
								onClick={() => {
									submitGrubPost();
								}}
							>
								Grub Request
							</Button>
							<Button
								variant="ghost"
								onClick={toggleGrubRequestForm}
							>
								Cancel
							</Button>
						</Col>
					</Row>
				</div>
			</Collapse>
		</div>
	);
};

export default UserGrubRequest;
