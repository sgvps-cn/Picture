
        // 获取表单和结果显示区域
        const form = document.getElementById('uploadForm');
        const resultDiv = document.getElementById('result');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();  // 防止表单刷新页面

            // 获取文件输入
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if (!file) {
                resultDiv.innerHTML = '<p class="error">请先选择文件！</p>';
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            try {
                // 使用 fetch 发送请求
                const response = await fetch('https://api.xinyew.cn/api/sogotc', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                if (data.errno === 0) {
                    // 成功处理图片，显示结果
                    resultDiv.innerHTML = `
                        <p>上传成功！</p>
                        <p>图片链接: <a href="${data.data.url}" target="_blank">${data.data.url}</a></p>
                        <p>图片文件名: ${data.data.fileName}</p>
                        <img src="${data.data.url}" alt="上传的图片" class="uploaded-image" />
                    `;
                } else {
                    // 失败，显示错误
                    resultDiv.innerHTML = `<p class="error">${data.error}</p>`;
                }
            } catch (error) {
                resultDiv.innerHTML = `<p class="error">请求失败：${error.message}</p>`;
            }
        });
