import classNames from 'classnames/bind'

import styles from './tabs.module.scss'

let cx = classNames.bind(styles)

// props.items, props.activeItem, props.clickHandler
const Tabs = ({ items, activeItem, clickHandler }) => {
	return <ul className={styles.tabs}>
		{items.map((item, index) => {
			// className="tabItem active"
			let tabItemClasses = cx({
				tabItem : true,
				active : activeItem === item
			})
			return <li 
				key={index}
				className={tabItemClasses}
				onClick={() => {
					clickHandler(item)
				}}
			>{item}</li>
		})}
	</ul>
}
export default Tabs;