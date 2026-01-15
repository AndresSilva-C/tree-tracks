import { Link } from "react-router";

function TreeListing({tree_obj}) {
	const route = tree_obj.map_link.slice(-10, -4);

    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }
	
	return (
		<Link to={'/trees/'+route} class="listing_link"> 
			<div className="max-w-2/3 grid grid-cols-2 gap-20 font-serif text-start text-md m-auto justify-center mb-5">
				<p className=""> {toTitleCase(tree_obj.common_name)} </p>
                <p className=""> {tree_obj.taxon} </p>
			</div>
		</Link>
	);
}
export default TreeListing;