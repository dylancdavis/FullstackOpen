const Filter = ({ onSearch }) => (
	<div>
		<label htmlFor="search-input">search: </label>
		<input id="search-input" onChange={onSearch}></input>
	</div>
)

export default Filter