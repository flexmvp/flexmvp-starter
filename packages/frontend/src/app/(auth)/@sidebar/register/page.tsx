import {
  BanknotesIcon,
  ForwardIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function RegisterPageSidebar() {
  return (
    <>
      <ForwardIcon className="h-16 w-16"></ForwardIcon>
      <h2 className="mt-0 mb-4">Speed</h2>
      <p>
        Launch your MVP faster with pre-built features and infrastructure so you
        can focus on your unique business
      </p>

      <BanknotesIcon className="h-16 w-16 mt-16"></BanknotesIcon>
      <h2 className="mt-0 mb-4">Cost</h2>
      <p>
        Zero-cost architecture on AWS that only costs you money when customers
        use your product
      </p>

      <RocketLaunchIcon className="h-16 w-16 mt-16"></RocketLaunchIcon>
      <h2 className="mt-0 mb-4">Scale</h2>
      <p>
        Built to handle 10 customers today and 10,000 tomorrow with no-config
        auto-scaling
      </p>
    </>
  );
}
