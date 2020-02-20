import React, {useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import styles from './health.module.css'

/**
 * Resuable health component that shows the health bar and changes color based on machine health.
 * @param props
 * @returns {*}
 * @constructor
 */
const Health = (props) => {
	const [health,setHealth] = useState({health:30});
	let colors = ['#f0ad4e','#5cb85c'];
	const color = props.value > 71 ? colors[0] : colors[1];
	return (
		<div>
			<h3>{props.showNumber ? props.value : ''}</h3>
			<div className={styles.healthBar}>
				<div id='left' className={`${styles.healthSection} ${styles.transition}`} style={{'width': props.value+'%',backgroundColor:`${color}`}}></div>
			</div>
		</div>
	);
};

export default Health ;