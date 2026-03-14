CREATE SCHEMA util;
GO

CREATE FUNCTION util.TfTenantPredicate
(
	@TenantId INT
)
RETURNS TABLE
WITH SCHEMABINDING
AS
	RETURN
		SELECT 1 AS Result 
		WHERE @TenantId = CAST(SESSION_CONTEXT(N'TenantId') AS INT);
GO

CREATE SECURITY POLICY dbo.TenantPolicyScreen
ADD FILTER PREDICATE util.TfTenantPredicate(TenantId) ON inv.Screen,
ADD BLOCK PREDICATE util.TfTenantPredicate(TenantId) ON inv.Screen AFTER INSERT;
GO

DROP SECURITY POLICY dbo.TenantPolicyScreen