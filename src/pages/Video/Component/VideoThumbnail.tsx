interface VideoThumbnailProps {
  thumbnail: string;
}

function VideoThumbnail({ thumbnail }: VideoThumbnailProps) {
  return (
    <img
      src={thumbnail}
      alt="thumbnail"
      className="inset-0 object-cover w-full h-full"
    />
  );
}

export default VideoThumbnail;
