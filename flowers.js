window.onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      
      // Đặt một thời gian chờ ngắn để đảm bảo việc xóa lớp 'not-loaded' hoàn tất
      setTimeout(() => {
        const element = document.getElementById("hidden");
        if (element) {
            element.classList.add("visible");
        }
      }, 6500); // Thời gian chờ có thể điều chỉnh tùy theo nhu cầu
  
      clearTimeout(c);
    }, 1000);
  };
  