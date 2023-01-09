import { ReferreredSiteColumns } from 'types/admin'
import { UsersReferral } from 'types/graphql';

type Referrals = Record<ReferreredSiteColumns, UsersReferral[]>;

export function buildReferrersColumns(referrals: UsersReferral[]): Referrals {
  const defaultValues: Referrals = { 
    lead: [],
    inactive: [], 
    free: [], 
    paid: [] 
  };

  return referrals.reduce((acc, referral: UsersReferral) => {
    if (!referral.site) {
      acc.lead.push(referral);
      return acc;
    }
    if (!referral.site.verifiedAt) {
      acc.inactive.push(referral);
      return acc;
    }
    if (referral.site.plan.free) {
      acc.free.push(referral);
      return acc;
    }
    if (!referral.site.plan.free) {
      acc.paid.push(referral);
      return acc;
    }

    return acc;
  }, defaultValues);
}

export const uploadInvoice = async (
  file: File,
  createSignedLink: Function,
) => {
  const { data } = await createSignedLink({
    variables: {
      input: { filename: file.name },
    }
  });

  const form = new FormData();

  // Add the fields S3 wants
  for (const [key, value] of Object.entries(JSON.parse(data.userInvoiceSignImage.fields))) {
    form.append(key, '' + value);
  }

  // Add the image
  form.append('file', file);

  await fetch(data.userInvoiceSignImage.url, { 
    method: 'POST', 
    body: form,
  });
};
