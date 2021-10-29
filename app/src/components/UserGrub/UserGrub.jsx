import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from '../Button';
import { convertDayOfTheWeekFromDateObject } from '../../util/helpers';
import './UserGrub.scss';

const UserGrub = ({ grub }) => {
	console.log(grub.requestdate);
	return (
		<div className="UserGrub">
			<Row className="align-items-center">
				<Col xs="auto">
					<div className="grub-avatar">
						<img
							src={grub?.restaurant?.img}
							alt={grub?.restaurant?.name || ''}
						/>
					</div>
				</Col>
				<Col>
					<div className="grub-message">
						<h2>
							{grub?.message}
							<br />
							<span>{grub?.restaurant?.name}</span>

							<span className="requestedby">
								Requested by{' '}
								{grub?.author?.name.split(' ').shift()} this{' '}
								{convertDayOfTheWeekFromDateObject(
									grub.requestdate
								)}
							</span>
						</h2>
					</div>
				</Col>
				<Col xs="auto">
					<div className={`grub-user-request-count`}>
						+{grub?.users_requested}
					</div>
				</Col>
				<Col xs="auto" className="ml-auto justify-self-end">
					<div className="grub-join-btn">
						<Button
							disabled={grub?.status === 'open' ? false : true}
							onClick={() => console.log('Join this grub')}
						>
							Request
						</Button>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default UserGrub;
