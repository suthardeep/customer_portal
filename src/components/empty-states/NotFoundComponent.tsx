import { Button } from "@/components/base/button/Button";
import { Link } from "@tanstack/react-router";
import FallbackView from "./FallbackView";

const NotFoundComponent = () => {
  return (
    <div className="fall h-[80dvh]">
      <FallbackView
        title="Page not found"
        subtitle="The page you're looking for doesn't exist or has been moved."
        icon="HelpSquare"
        footer={
          <Link to="/">
            <Button>Go home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundComponent;
