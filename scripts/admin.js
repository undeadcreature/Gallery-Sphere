auth.onAuthStateChanged(user => {

    if (!user) {
        window.location.href = 'login.html';
    }
    else {
        loadAdminGallery();
        loadStatistics();
    }
});

//logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    auth.signOut()
        .then(() => window.location.href = 'login.html')
        .catch(error => showErrorMessage(error.message));
});


//upload artwork function
 

//cloudinary upload function
async function uploadToCloudinary(file) {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Cloudinary upload failed');
    }
    const data = await response.json();
    return data.secure_url;
}

//load artwork for admin
async function loadAdminGallery() {
    try {
        const snapshot = await db.collection('artworks').orderBy('createdAt', 'desc').get();

        const gallery = document.getElementById('adminGallery');
        gallery.innerHTML = ''; // Clear existing content

        snapshot.forEach(doc => {
            const artwork = doc.data();
            gallery.appendChild(createArtworkElement(doc.id, artwork));
        });
    } catch (error){
        showErrorMessage('Failed to load gallery: ' + error.message);
    }
}

//create artwork element for admin

function createArtworkElement(id, artwork) {
    const card = document.createElement('div');
    card.className = 'artwork-card';
    card.innerHTML = `
        <img src= "${getOptimizedUrl(artwork.imageUrl, 300)}"
            alt= "${artwork.caption}"
            class="artwork-img">
            <div class="artwork-body">
            <h3 class ="artwork-title">${artwork.caption}</h3>
            <div class -"artwork-meta">
            <span>
            ${artwork.size.charAt(0).toUpperCase() + artwork.size.slice(1)}
            </span>
            <span>
            ${new Date(artwork.createdAt?.toDate()).toLocaleDateString()}
            </span>
            </div>
            <div class="artwork-actions">
                <button class="action-btn edit-btn" data-id="${id}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn delete-btn" data-id="${id}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>        
            </div>  
        `;
        card.querySelector('.delete-btn').addEventListener('click', async (e) =>{
            if (confirm ('Delete this artwork permanently?')){
                try{
                    await db.collection('artworks').doc(id).delete();
                    showSuccessMessage('Artwork deleted sucessfully');
                    loadAdminGallery();
                    loadStatistics();
                } catch (error) {
                    showErrorMessage('Failed to delete: ' + error.message);
                }
            }
        });
        return card;
}

function getOptimizedUrl(url, width){
    if(!url.includes('cloudinary.com')) return url;
    return url.replace('/upload/', `/upload/w_${width},c_fill,q_auto,f_auto/`);
}

async function loadStatistics() {
    const snapshot = await db.collection('artworks').get();
    const counts = {small: 0, medium: 0, large: 0};

    snapshot.forEach(doc => {
        const size = doc.data().size;
        counts[size] = (counts[size] || 0) + 1;
    });

    document.getElementById('totalArtworks').textContent = snapshot.size;
    document.getElementById('smallArtworks').textContent =  counts.small;
    document.getElementById('mediumArtworks').textContent =  counts.medium;
    document.getElementById('largeArtworks').textContent =  counts.large;
}

function resetUploadForm() {
    document.getElementById('imageFile').value = '';
    document.getElementById('imageSize').value = 'small'; // or whatever default
    document.getElementById('imageCaption').value = '';
    showUploadStatus(''); // clears status box
}


function showUploadStatus(message) {
    const statusBox = document.getElementById("uploadStatus");
    if (statusBox) {
      statusBox.innerText = message;
    } else {
      console.log(message); // fallback
    }
  }
  