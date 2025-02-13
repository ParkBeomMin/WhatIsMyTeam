export const resizeImage = (dataUrl: string, maxWidth: number): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = dataUrl;
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            
            // 이미지가 maxWidth보다 큰 경우에만 리사이징
            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            
            // 이미지 품질을 0.8로 설정하여 용량 추가 감소
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
    });
}; 