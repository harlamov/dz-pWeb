/*
�����:mcxaos
������:1.0
�����������: ������� ������ ��� ��������� ����������� � ���� ������ 
*/


/*
���������� hosts
127.0.0.1 test_for_nodejs1.com
127.0.0.1 test_for_nodejs2.com
*/

var port=80;// ������ default �����
var net = require('net');//���������� ��� ������ � �����
var fs = require('fs');//���������� ��� ������ � �������

/*
 ������� ������ ,������� ����� ������������ �������� �����������
*/
var server = net.createServer(function (socket) {
	/*
	������� ����� � ���� �����������
	*/
	socket.on('data', function (data) {
	console.log(data.toString());		/*  ���������� ������ �� �����������	*/

	/*
	�� ���������� ������ ����������� ��� ����� ������� ��� ���� ����������
	*/
	var host_to_include=data.toString().replace("/"," ").split("\n")[2].split(":")[1].trim();


	/*
	�������� ����,������� ������ ����
	*/
	var file_name=data.toString();
    file_name=file_name.replace("/"," ").split("\n")[0].split(" ")[2];


	/*
	���� ������ �� ������,�� ������� index.html
	*/

	if(file_name=="")
	{
	file_name="index.html";
	}
	/*
	���� ������� ������� � ������ - ������� 404
	*/

	if(file_name=="test.js")
	{
	socket.write("HTTP/1.0 404 NOT FOUND \n\n"); 
	socket.end();
	}



	file_name=host_to_include+"/"+file_name;
	console.log(file_name);
	fs.readFile(file_name,function (err,data) {
		console.log(err);
		if(err==null){
			socket.write("HTTP/1.1 200 OK \n"); 
			socket.write("Content-Type: text/html \n\n");
			socket.write(data);
		 }
		 else
		 {
			socket.write("HTTP/1.0 404 NOT FOUND \n\n"); 
		 }	
		 socket.end();
   }); 
});

socket.on('error', function (error) {
    console.log(error);
  });
});

// ������� ����
server.listen(port, function() {
  console.log("opened server");
});