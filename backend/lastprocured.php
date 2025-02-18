<?php
// Enable CORS (Cross-Origin Resource Sharing) for all domains
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");

// Database credentials for Inventory_Removal
$serverName = 'SESCADASPARE01\SCM';
$database = 'Test'; // Replace with your database name
$username = 'meet29';
$password = 'Kitkat997';

// Establish database connection
$dsn = "sqlsrv:Server=$serverName;Database=$database";
$options = array(
    PDO::SQLSRV_ATTR_ENCODING => PDO::SQLSRV_ENCODING_UTF8,
    PDO::SQLSRV_ATTR_DIRECT_QUERY => true,
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
);

$response = array(); // Initialize the response array

try {
    $db = new PDO($dsn, $username, $password, $options);

    // Get the material code from the query string
    $materialCode = isset($_GET['materialCode']) ? $_GET['materialCode'] : '';

    if ($materialCode === '') {
        $response['error'] = "Material code is empty.";
    } else {
        // Remove leading zeroes using SUBSTRING function and execute a SQL query to fetch the latest date
        $sql = "SELECT TOP 1 [MONTH_START] 
                FROM [Inventory_MB5B2_New]
                WHERE LTRIM(SUBSTRING([MATERIAL], PATINDEX('%[^0]%', [MATERIAL]+'.'), LEN([MATERIAL]))) = :materialCode AND [MOVE_TYPE] = '101'
                ORDER BY [MONTH_START] DESC";

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':materialCode', $materialCode);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $response['MONTH_START'] = $result['MONTH_START'];
        } else {
            $response['error'] = "Material is inactive.";
        }
    }

} catch (PDOException $e) {
    $response['error'] = "Error: " . $e->getMessage();
}

// Set the content type to JSON and echo the response
header('Content-Type: application/json');
echo json_encode($response);
?>
