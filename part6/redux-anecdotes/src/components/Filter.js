const Filter = ({ onSearch }) => (
	<div>
		<label for="search-input">search: </label>
		<input id="search-input" onChange={onSearch}></input>
	</div>
)

export default Filter