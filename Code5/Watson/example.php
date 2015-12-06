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
	

	$demo_text = $_POST['code'];
	//$demo_text = "Create a red apple in A5.";
	$acctKey = 'Jwi85+PUNdH67fwvjhbDpVbdoQgoKdMK4h9q09/FeuA';

	$rootUri = 'https://api.datamarket.azure.com/Bing/Search';
	
	$response = $alchemyapi->relations('text',$demo_text, null);

	if ($response['status'] == 'OK') {
		//echo '## Response Object ##', "<br />";
		//echo print_r($response);

		//echo "<br />";
		//echo '## Relations ##', "<br />";
		foreach ($response['relations'] as $relation) {
			if (array_key_exists('subject', $relation)) {
				// Encode the query and the single quotes that must surround it.
				$query = urlencode("'{$relation['subject']['text']} filterui:photo-transparent'");

				// Get the selected service operation (Web or Image).

				$serviceOp = "Image";
				$filterimg = urlencode("'size:small+Aspect:Square'");
				
				// Construct the full URI for the query.

				$requestUri = "$rootUri/$serviceOp?\$format=json&Query=$query&ImageFilters=$filterimg&\$top=1";
				// Encode the credentials and create the stream context.
				$auth = base64_encode("$acctKey:$acctKey");

				$data = array(

				'http' => array(

				'request_fulluri' => true,

				// ignore_errors can help debug – remove for production. This option added in PHP 5.2.10

				'ignore_errors' => true,

				'header' => "Authorization: Basic $auth")

				);
				$context = stream_context_create($data);
				// Get the response from Bing.

				$responsetwo = file_get_contents($requestUri, 0, $context);
				// Decode the response. 
				$jsonObj = json_decode($responsetwo);
				$resultStr = '';
				foreach($jsonObj->d->results as $value) { 
					switch ($value->__metadata->type) { 
						case 'WebResult': $resultStr .= "<a href=\"{$value->Url}\">{$value->Title}</a><p>{$value->Description}</p>";
						 break;
						  case 'ImageResult': $resultStr .= "<h4>{$value->Title} ({$value->Width}x{$value->Height}) " . "{$value->FileSize} bytes)</h4>" . "<a href=\"{$value->MediaUrl}\">" . "<img src=\"{$value->Thumbnail->MediaUrl}\"></a><br />";
						   echo "{$value->Thumbnail->MediaUrl}";
						   break; }
						    }

				$contents = str_replace('{RESULTS}', $resultStr, $contents);
			}

			//if (array_key_exists('action', $relation)) {
		//		echo 'Action: ', $relation['action']['text'], "<br />";
		//	}
//
	//		if (array_key_exists('object', $relation)) {
	//			echo 'Object: ', $relation['object']['text'], "<br />";
	//		}
	//		if (array_key_exists('location', $relation)) {
	//			echo 'Location: ', $relation['location']['text'], "<br />";
	//		}
	//		echo "<br />";
		}
	} else {
		echo 'Error in the relation extraction call: ', $response['statusInfo'];
	}

?>
