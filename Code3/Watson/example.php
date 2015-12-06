<?php	
/*
   Copyright 2013 AlchemyAPI

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

	require_once 'alchemyapi.php';
	$alchemyapi = new AlchemyAPI();
	

	$demo_text = 'Create a red square in A5.';

	
	$response = $alchemyapi->relations('text',$demo_text, null);

	if ($response['status'] == 'OK') {
		//echo '## Response Object ##', "<br />";
		//echo print_r($response);

		echo "<br />";
		echo '## Relations ##', "<br />";
		foreach ($response['relations'] as $relation) {
			if (array_key_exists('subject', $relation)) {
				echo 'Subject: ', $relation['subject']['text'], "<br />";
			}

			if (array_key_exists('action', $relation)) {
				echo 'Action: ', $relation['action']['text'], "<br />";
			}

			if (array_key_exists('object', $relation)) {
				echo 'Object: ', $relation['object']['text'], "<br />";
			}
			if (array_key_exists('location', $relation)) {
				echo 'Location: ', $relation['location']['text'], "<br />";
			}
			echo "<br />";
		}
	} else {
		echo 'Error in the relation extraction call: ', $response['statusInfo'];
	}

?>
