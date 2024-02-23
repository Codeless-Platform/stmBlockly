function editFileAtLine(filePath, lineNumber, newText) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:7000/edit_file_at_line", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("File edited successfully.");
            } else {
                console.error("Error editing file.");
            }
        }
    };
    var data = "file_path=" + encodeURIComponent(filePath) + "&line_number=" + encodeURIComponent(lineNumber) + "&new_text=" + encodeURIComponent(newText);
    xhr.send(data);
  }
  
  function deleteLine(filePath, lineNumber) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:7000/delete_line", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Line deleted succesfully.");
            } else {
                console.error("Error editing file.");
            }
        }
    };
    var data = "file_path=" + encodeURIComponent(filePath) + "&line_number=" + encodeURIComponent(lineNumber) ;
    xhr.send(data);
  }