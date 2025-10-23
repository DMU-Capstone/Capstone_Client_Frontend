import { BASE_URL } from "@env";

export const getImageUrl = (imageUrl: string): string => {
  // 빈 문자열이나 null/undefined 체크
  if (!imageUrl || imageUrl.trim() === "") {
    console.warn("Empty image URL provided");
    return "https://via.placeholder.com/300x200/CCCCCC/FFFFFF?text=No+Image";
  }

  // 이미 완전한 URL인 경우 그대로 반환
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // 상대 경로인 경우 BASE_URL과 결합
  return `${BASE_URL}${imageUrl}`;
};

export const getImageUrls = (imageUrls: string[]): string[] => {
  return imageUrls.map(getImageUrl);
};
