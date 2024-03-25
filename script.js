// let table = new DataTable("#myTable");
      document.addEventListener("DOMContentLoaded", function () {
        const addForm = document.getElementById("addForm");
        const editForm = document.getElementById("editForm");
        const dataBody = document.getElementById("dataBody");

        // Function to render data from localStorage
        function renderData() {
          dataBody.innerHTML = "";
          const data = JSON.parse(localStorage.getItem("students")) || [];
          data.forEach((student) => {
            const row = `
                <tr>
                    <td>${student.nim}</td>
                    <td>${student.nama}</td>
                    <td>${student.alamat}</td>
                    <td>
                        <button class="btn btn-info btn-sm edit-btn" data-nim="${student.nim}" data-nama="${student.nama}" data-alamat="${student.alamat}"><i class="bi bi-pencil-square"></i> Ubah</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-nim="${student.nim}"><i class="bi bi-trash"></i> Hapus</button>
                    </td>
                </tr>
            `;
            dataBody.innerHTML += row;
          });
        }

        // Function to add data
        addForm.addEventListener("submit", function (event) {
          event.preventDefault();
          const nim = document.getElementById("nim").value;
          const nama = document.getElementById("nama").value;
          const alamat = document.getElementById("alamat").value;
           // Memeriksa apakah semua kolom terisi
          if (nim.trim() === "" || nama.trim() === "" || alamat.trim() === "") {
            $('#addErrorModal').modal('show'); // Menampilkan modal pesan kesalahan
            return; // Menghentikan proses penambahan data jika ada kolom yang kosong
        }
          const student = { nim, nama, alamat };
          const data = JSON.parse(localStorage.getItem("students")) || [];
          data.push(student);
          localStorage.setItem("students", JSON.stringify(data));
          renderData();
          $("#addSuccessModal").modal("show");
          addForm.reset();
        });

        // Function to populate edit modal
        dataBody.addEventListener("click", function (event) {
          if (event.target.classList.contains("edit-btn")) {
            const nim = event.target.getAttribute("data-nim");
            const nama = event.target.getAttribute("data-nama");
            const alamat = event.target.getAttribute("data-alamat");
            document.getElementById("editNim").value = nim;
            document.getElementById("editNama").value = nama;
            document.getElementById("editAlamat").value = alamat;
            $("#editModal").modal("show");

          //   if (nim.trim() === "" || nama.trim() === "" || alamat.trim() === "") {
          //     document.getElementById("editWarningMessage").textContent = "Silakan lengkapi semua kolom sebelum menyimpan perubahan."; // Menetapkan pesan peringatan
          //     $('#editWarningModal').modal('show'); // Menampilkan modal peringatan
          // }
          }
        });

        // Function to edit data
        editForm.addEventListener("submit", function (event) {
          event.preventDefault();
          const nim = document.getElementById("editNim").value;
          const nama = document.getElementById("editNama").value;
          const alamat = document.getElementById("editAlamat").value;
          const data = JSON.parse(localStorage.getItem("students")) || [];
          const newData = data.map((student) => {
            if (student.nim === nim) {
              return { nim, nama, alamat };
            }
            return student;
          });
          if (nim.trim() === "" || nama.trim() === "" || alamat.trim() === "") {
            $('#editWarningModal').modal('show'); // Menampilkan modal peringatan
            return; // Menghentikan proses penyimpanan perubahan jika ada kolom yang kosong
          }
          
          localStorage.setItem("students", JSON.stringify(newData));
          renderData();
          $("#editModal").modal("hide");
          // Setelah data berhasil diubah
          $("#editSuccessModal").modal("show");
        });

        // Function to delete data
        dataBody.addEventListener("click", function (event) {
          if (event.target.classList.contains("delete-btn")) {
            const nim = event.target.getAttribute("data-nim");
            const data = JSON.parse(localStorage.getItem("students")) || [];
            const newData = data.filter((student) => student.nim !== nim);
            localStorage.setItem("students", JSON.stringify(newData));
            renderData();
            // Setelah data berhasil dihapus
            $("#deleteSuccessModal").modal("show");
          }
        });

        // Initial rendering of data
        renderData();
      });

      function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        document.getElementById('clock').textContent = timeString;
      }
    
      updateTime();
      setInterval(updateTime, 1000);