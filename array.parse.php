<?

include("jparser/jparser.php");
// include("jparser-devel-1-0-0/PLUG/plugcli.php");

// $bin = "bin";
// $dir = new DirectoryIterator($bin);
// $arr = array_map("trim", file("array"));

// // echo '<?xml version="1.0" encoding="utf-8"?
// // >';

// foreach($dir as $name):
// 	if (in_array($name, $arr)) {
// 		$src = file_get_contents("$bin/$name");
// 		$fn = JParser::parse_string($src);
// 		// echo $fn->dump(new JLex)."\n";
// 		$doc = new DOMDocument();
// 		$doc->loadXML($fn->str(new JLex));



// 	}

// endforeach;


function traverse(DomNode $node, $level=0){
	// if ($max > 0 && $max === $level) {
	// 	return;
	// }
	for ($x = 0; $x < $level; $x++) {
		echo " ";
	}
	if ($node->nodeType == XML_ELEMENT_NODE) {
		print $node->tagName." ".$level;
		if (strpos(trim($node->nodeValue), "\n") === false) {

			echo " ".trim($node->nodeValue);

		}
		echo "\n";
	}
	if ($node->hasChildNodes()) {
		$children = $node->childNodes;
		foreach($children as $kid) {
			if ($kid->nodeType == XML_ELEMENT_NODE) {
				traverse($kid, $level+1);
			}
		}
	}
}
function traverseL(DomNodeList $nodelist, $level=0){
	foreach($nodelist as $kid) {
		if ($kid->nodeType == XML_ELEMENT_NODE) {
			traverse($kid, $level+1);
		}
	}
}
// DOMElement Object
// (
//     [tagName] => J_LIBRARY
//     [schemaTypeInfo] =>
//     [nodeName] => J_LIBRARY
//     [nodeValue] =>
//     [nodeType] => 1
//     [parentNode] => (object value omitted)
//     [childNodes] => (object value omitted)
//     [firstChild] => (object value omitted)
//     [lastChild] => (object value omitted)
//     [previousSibling] =>
//     [attributes] => (object value omitted)
//     [ownerDocument] => (object value omitted)
//     [namespaceURI] =>
//     [prefix] =>
//     [localName] => J_LIBRARY
//     [baseURI] => file:/C:/Users/Matthew/downloads/php.js/
//     [textContent] =>
// )


$doc = new DOMDocument();
$doc->loadXML(file_get_contents("array.xml"));
$exprs = $doc->getElementsByTagName('J_EXPR_STATEMENT');
traverseL($exprs);
// $exprs->nodeValue = "";
// print_r($exprs);



// $root->nodeValue = "";
// print_r($root);

// foreach ($exprs as $expr) {
// 	// echo $expr->nodeValue, PHP_EOL;
// 	print_r($expr->firstChild);
// 	break;
// }
