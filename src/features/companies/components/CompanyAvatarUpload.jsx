import { useState } from "react";
import { useAuth } from '../../auth'
import { useApiClient } from '../../../context/ApiClient'


function CompanyAvatarUpload({ companyId, currentAvatar, onUploadSuccess, size }) {

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(currentAvatar)
  const [uploading, setUploading] = useState(false)

  const authContext = useAuth()
  const apiClient = useApiClient()

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true)
    const formData = new FormData()
    formData.append("avatar", image)

    try {
      const response = await apiClient.patch(`/companies/${companyId}/admin/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${authContext.token}`
        },
      });

      onUploadSuccess(response.data.avatar)
    } catch (error) {
      console.error("Upload failed", error)
    } finally {
      setUploading(false)
    }
  };

  return (
    <div>
      {preview && <img src={preview} alt="Preview" style={{ width: 100, height: 100, borderRadius: "5%" }} />}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading || !image}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default CompanyAvatarUpload;
