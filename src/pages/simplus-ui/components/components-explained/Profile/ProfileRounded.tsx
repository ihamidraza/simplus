import * as React from "react";
import { Profile } from "@simplus/siui"


export default function(props){

	return (
		<div style={{display:"flex", alignItems:"baseline"}}>
			<Profile 
				picture={{ rounded : true, url : "/assets/macaw.jpg", size : 100}}
				name="John Doe"
				role="President"/>

			<Profile 
				picture={{ rounded : true, url : "/assets/macaw.jpg", size : 100}}
				name="John Doe"
				role="President"
				small/>
		</div>
	)

}