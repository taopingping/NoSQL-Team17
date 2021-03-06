# NoSQL-Team17

## Run the project

* Install and run elasticsearch (https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html)
* Edit elasticsearch.yml and add the following lines:
```
     script.groovy.sandbox.enabled: true
     script.inline: on
     script.indexed: on 
     script.search: on
     script.engine.groovy.inline.aggs: on
```
* Make sure elasticsearch is using its default port 9200
* Clone the repository (git clone https://github.com/taopingping/NoSQL-Team17.git)
* Navigate to the project (/yourpath/NoSQL-Team17) and run "node app.js" in your terminal
* You can open the application in your browser at [http://localhost:1337](http://localhost:1337)

## Fileupload

* Uploaded files are stored locally at /yourpath/NoSQL-Team17/uploads and can be displayed or deleted there

## Used modules

* [multer](https://github.com/expressjs/multer) - middleware for file upload
* [fs](https://nodejs.org/api/fs.html) - read all files from server
* [textract](https://github.com/dbashford/textract) - extract text from files
* [elasticsearch](https://www.npmjs.com/package/elasticsearch) - search
* [express](http://expressjs.com) - mvc 

## Additional plugins

* [jQuery](https://jquery.com)
* [bootstrap](http://getbootstrap.com)
* [DataTables](https://datatables.net)

## Recommended Formats that can be analyzed
* HTML, HTM
* Markdown
* XML, XSL
* DOC, DOCX
* TXT
* RTF
* For more check [textract](https://github.com/dbashford/textract)

## Upload requirements

* Check the [textract requirements](https://github.com/dbashford/textract#extraction-requirements)
