import styled from "styled-components";
import media from "../../../utils/mediaHelper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = styled.div`
  max-width: 282px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${media.tablet`
    width: 282px;
    height: 402px;`}
`;

const SkeletonImgWrapper = styled.div`
  width: 158px;
  height: 206px;
  border-radius: 8px;
  ${media.tablet`
    width: 282px;
    height: 293px;`}
`;

const SkeletonDescription = styled.div`
  width: 100%;
  padding: 0 2px;
`;

const SkeletonProgressWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export default function DonationSkeleton() {
  return (
    <SkeletonCard>
      <SkeletonImgWrapper>
        <Skeleton
          height="100%"
          width="100%"
          borderRadius={8}
          duration={0.5}
          baseColor="#333"
          highlightColor="#444"
        />
      </SkeletonImgWrapper>
      <SkeletonDescription>
        <Skeleton
          height={18}
          width="60%"
          duration={0.5}
          baseColor="#333"
          highlightColor="#444"
        />
        <Skeleton
          height={20}
          width="80%"
          style={{ marginTop: "6px" }}
          duration={0.5}
          baseColor="#333"
          highlightColor="#444"
        />
        <SkeletonProgressWrap>
          <Skeleton
            height={12}
            width={50}
            duration={0.5}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            height={12}
            width={40}
            duration={0.5}
            baseColor="#333"
            highlightColor="#444"
          />
        </SkeletonProgressWrap>
        <Skeleton
          height={1}
          width="100%"
          style={{ marginTop: "7px" }}
          duration={0.5}
          baseColor="#333"
          highlightColor="#444"
        />
      </SkeletonDescription>
    </SkeletonCard>
  );
}
